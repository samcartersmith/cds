import { readFileSync } from 'node:fs';
import { MetricType } from '@cbhq/client-analytics';

import { CDS_RULE_PREFIXES, COMPONENT_PATTERN } from './constants';
import type { AggregatedMetric, CdsViolation, EslintFileResult } from './types';

export class EslintOutputParser {
  static parseEslintOutput(filePath: string): EslintFileResult[] {
    const raw = readFileSync(filePath, 'utf8');
    if (!raw.trim()) {
      return [];
    }
    try {
      return JSON.parse(raw) as EslintFileResult[];
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to parse ESLint JSON output: ${message}`);
    }
  }

  static isCdsRule(ruleId: string | null): ruleId is string {
    return !!ruleId && CDS_RULE_PREFIXES.some((prefix) => ruleId.startsWith(prefix));
  }

  static extractComponentName(message: string): string {
    const match = message.match(COMPONENT_PATTERN);
    return match ? match[1] : 'unknown';
  }

  static severityLabel(severity: number): 'error' | 'warning' {
    return severity === 2 ? 'error' : 'warning';
  }

  static collectCdsViolations(eslintResults: EslintFileResult[]): CdsViolation[] {
    const violations: CdsViolation[] = [];
    for (const file of eslintResults) {
      for (const msg of file.messages || []) {
        if (EslintOutputParser.isCdsRule(msg.ruleId)) {
          violations.push({
            ruleId: msg.ruleId,
            severity: msg.severity,
            message: msg.message,
            filePath: file.filePath,
            line: msg.line,
            column: msg.column,
          });
        }
      }
    }
    return violations;
  }

  static aggregateMetrics(violations: CdsViolation[], repositoryName: string): AggregatedMetric[] {
    const metrics: AggregatedMetric[] = [];
    const totalsBySeverity: Record<string, number> = { warning: 0, error: 0 };
    const byRule: Record<string, number> = {};
    const byComponent: Record<string, number> = {};

    for (const v of violations) {
      const sev = EslintOutputParser.severityLabel(v.severity);
      totalsBySeverity[sev]++;

      const ruleKey = `${v.ruleId}|${sev}`;
      byRule[ruleKey] = (byRule[ruleKey] || 0) + 1;

      const component = EslintOutputParser.extractComponentName(v.message);
      const compKey = `${component}|${sev}`;
      byComponent[compKey] = (byComponent[compKey] || 0) + 1;
    }

    for (const [severity, count] of Object.entries(totalsBySeverity)) {
      metrics.push({
        metricName: 'eslint_cds.total_violations',
        metricType: MetricType.count,
        value: count,
        tags: { repository: repositoryName, severity },
      });
    }

    for (const [key, count] of Object.entries(byRule)) {
      const [rule, severity] = key.split('|');
      const ruleName = rule.replace(/^@(coinbase|cbhq)\/cds\//, '');
      metrics.push({
        metricName: 'eslint_cds.violations_by_rule',
        metricType: MetricType.count,
        value: count,
        tags: { repository: repositoryName, rule: ruleName, severity },
      });
    }

    for (const [key, count] of Object.entries(byComponent)) {
      const [component, severity] = key.split('|');
      metrics.push({
        metricName: 'eslint_cds.violations_by_component',
        metricType: MetricType.count,
        value: count,
        tags: { repository: repositoryName, component, severity },
      });
    }

    return metrics;
  }
}
