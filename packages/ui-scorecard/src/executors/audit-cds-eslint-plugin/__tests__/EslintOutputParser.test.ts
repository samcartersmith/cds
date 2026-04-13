import fs from 'node:fs';

import { EslintOutputParser } from '../EslintOutputParser';
import type { CdsViolation, EslintFileResult } from '../types';

jest.mock('node:fs');

const mockReadFileSync = fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>;

function buildEslintFileResult(
  filePath: string,
  messages: Array<{
    ruleId: string | null;
    severity: number;
    message: string;
    line: number;
    column: number;
  }>,
): EslintFileResult {
  return { filePath, messages };
}

describe('EslintOutputParser', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('parseEslintOutput', () => {
    it('should parse valid ESLint JSON output', () => {
      const eslintOutput: EslintFileResult[] = [
        buildEslintFileResult('src/App.tsx', [
          {
            ruleId: '@coinbase/cds/no-v7-imports',
            severity: 2,
            message: 'Do not use v7 imports',
            line: 1,
            column: 1,
          },
        ]),
      ];
      mockReadFileSync.mockReturnValue(JSON.stringify(eslintOutput));

      const result = EslintOutputParser.parseEslintOutput('/path/to/output.json');

      expect(result).toEqual(eslintOutput);
    });

    it('should return empty array for empty file', () => {
      mockReadFileSync.mockReturnValue('');

      const result = EslintOutputParser.parseEslintOutput('/path/to/output.json');

      expect(result).toEqual([]);
    });

    it('should return empty array for whitespace-only file', () => {
      mockReadFileSync.mockReturnValue('   \n  ');

      const result = EslintOutputParser.parseEslintOutput('/path/to/output.json');

      expect(result).toEqual([]);
    });

    it('should throw error for malformed JSON', () => {
      mockReadFileSync.mockReturnValue('not valid json{{{');
      expect(() => EslintOutputParser.parseEslintOutput('/path/to/output.json')).toThrow(
        'Failed to parse ESLint JSON output',
      );
    });
  });

  describe('isCdsRule', () => {
    it('should return true for @coinbase/cds/ prefixed rules', () => {
      expect(EslintOutputParser.isCdsRule('@coinbase/cds/no-v7-imports')).toBe(true);
    });

    it('should return true for @cbhq/cds/ prefixed rules', () => {
      expect(EslintOutputParser.isCdsRule('@cbhq/cds/some-rule')).toBe(true);
    });

    it('should return false for non-CDS rules', () => {
      expect(EslintOutputParser.isCdsRule('no-unused-vars')).toBe(false);
      expect(EslintOutputParser.isCdsRule('@typescript-eslint/no-explicit-any')).toBe(false);
    });

    it('should return false for null ruleId', () => {
      expect(EslintOutputParser.isCdsRule(null)).toBe(false);
    });
  });

  describe('extractComponentName', () => {
    it('should extract known CDS component names from messages', () => {
      expect(EslintOutputParser.extractComponentName('Button must have accessibilityLabel')).toBe(
        'Button',
      );
      expect(
        EslintOutputParser.extractComponentName('Tooltip requires hasInteractiveContent'),
      ).toBe('Tooltip');
      expect(EslintOutputParser.extractComponentName('LineChart needs scrubber label')).toBe(
        'LineChart',
      );
    });

    it('should return "unknown" when no component name is found', () => {
      expect(EslintOutputParser.extractComponentName('Some generic lint error')).toBe('unknown');
    });

    it('should match the first component if multiple are present', () => {
      expect(EslintOutputParser.extractComponentName('Button wraps a Tooltip incorrectly')).toBe(
        'Button',
      );
    });
  });

  describe('severityLabel', () => {
    it('should return "error" for severity 2', () => {
      expect(EslintOutputParser.severityLabel(2)).toBe('error');
    });

    it('should return "warning" for severity 1', () => {
      expect(EslintOutputParser.severityLabel(1)).toBe('warning');
    });

    it('should return "warning" for any non-2 severity', () => {
      expect(EslintOutputParser.severityLabel(0)).toBe('warning');
    });
  });

  describe('collectCdsViolations', () => {
    it('should filter to only CDS rule violations', () => {
      const eslintResults: EslintFileResult[] = [
        buildEslintFileResult('src/App.tsx', [
          {
            ruleId: '@coinbase/cds/no-v7-imports',
            severity: 2,
            message: 'Do not use v7 imports',
            line: 5,
            column: 1,
          },
          {
            ruleId: 'no-unused-vars',
            severity: 1,
            message: 'x is unused',
            line: 10,
            column: 3,
          },
          {
            ruleId: '@cbhq/cds/control-has-associated-label-extended',
            severity: 1,
            message: 'Button must have accessibilityLabel',
            line: 15,
            column: 5,
          },
        ]),
      ];

      const violations = EslintOutputParser.collectCdsViolations(eslintResults);

      expect(violations).toHaveLength(2);
      expect(violations[0].ruleId).toBe('@coinbase/cds/no-v7-imports');
      expect(violations[1].ruleId).toBe('@cbhq/cds/control-has-associated-label-extended');
    });

    it('should return empty array when no CDS violations exist', () => {
      const eslintResults: EslintFileResult[] = [
        buildEslintFileResult('src/App.tsx', [
          {
            ruleId: 'no-unused-vars',
            severity: 1,
            message: 'x is unused',
            line: 1,
            column: 1,
          },
        ]),
      ];

      const violations = EslintOutputParser.collectCdsViolations(eslintResults);

      expect(violations).toHaveLength(0);
    });

    it('should handle files with no messages', () => {
      const eslintResults: EslintFileResult[] = [buildEslintFileResult('src/Clean.tsx', [])];

      const violations = EslintOutputParser.collectCdsViolations(eslintResults);

      expect(violations).toHaveLength(0);
    });

    it('should collect violations across multiple files', () => {
      const eslintResults: EslintFileResult[] = [
        buildEslintFileResult('src/A.tsx', [
          {
            ruleId: '@coinbase/cds/no-v7-imports',
            severity: 2,
            message: 'Do not use v7 imports',
            line: 1,
            column: 1,
          },
        ]),
        buildEslintFileResult('src/B.tsx', [
          {
            ruleId: '@cbhq/cds/web-tooltip-interactive-content',
            severity: 1,
            message: 'Tooltip requires hasInteractiveContent',
            line: 20,
            column: 3,
          },
        ]),
      ];

      const violations = EslintOutputParser.collectCdsViolations(eslintResults);

      expect(violations).toHaveLength(2);
      expect(violations[0].filePath).toBe('src/A.tsx');
      expect(violations[1].filePath).toBe('src/B.tsx');
    });
  });

  describe('aggregateMetrics', () => {
    const repoName = 'test-repo';

    it('should produce total violation metrics by severity', () => {
      const violations: CdsViolation[] = [
        {
          ruleId: '@coinbase/cds/no-v7-imports',
          severity: 2,
          message: 'Do not use v7 imports',
          filePath: 'src/A.tsx',
          line: 1,
          column: 1,
        },
        {
          ruleId: '@coinbase/cds/control-has-associated-label-extended',
          severity: 1,
          message: 'Button must have accessibilityLabel',
          filePath: 'src/B.tsx',
          line: 5,
          column: 1,
        },
      ];

      const metrics = EslintOutputParser.aggregateMetrics(violations, repoName);

      const totalMetrics = metrics.filter((m) => m.metricName === 'eslint_cds.total_violations');
      expect(totalMetrics).toHaveLength(2);

      const errorTotal = totalMetrics.find((m) => m.tags.severity === 'error');
      expect(errorTotal?.value).toBe(1);

      const warningTotal = totalMetrics.find((m) => m.tags.severity === 'warning');
      expect(warningTotal?.value).toBe(1);
    });

    it('should produce per-rule metrics with stripped prefixes', () => {
      const violations: CdsViolation[] = [
        {
          ruleId: '@coinbase/cds/no-v7-imports',
          severity: 2,
          message: 'Do not use v7 imports',
          filePath: 'src/A.tsx',
          line: 1,
          column: 1,
        },
        {
          ruleId: '@coinbase/cds/no-v7-imports',
          severity: 2,
          message: 'Do not use v7 imports',
          filePath: 'src/B.tsx',
          line: 3,
          column: 1,
        },
      ];

      const metrics = EslintOutputParser.aggregateMetrics(violations, repoName);

      const ruleMetrics = metrics.filter((m) => m.metricName === 'eslint_cds.violations_by_rule');
      expect(ruleMetrics).toHaveLength(1);
      expect(ruleMetrics[0].tags.rule).toBe('no-v7-imports');
      expect(ruleMetrics[0].value).toBe(2);
    });

    it('should produce per-component metrics', () => {
      const violations: CdsViolation[] = [
        {
          ruleId: '@coinbase/cds/control-has-associated-label-extended',
          severity: 1,
          message: 'Button must have accessibilityLabel',
          filePath: 'src/A.tsx',
          line: 1,
          column: 1,
        },
        {
          ruleId: '@coinbase/cds/web-tooltip-interactive-content',
          severity: 1,
          message: 'Tooltip requires hasInteractiveContent',
          filePath: 'src/B.tsx',
          line: 5,
          column: 1,
        },
        {
          ruleId: '@coinbase/cds/control-has-associated-label-extended',
          severity: 2,
          message: 'Button must have accessibilityLabel',
          filePath: 'src/C.tsx',
          line: 10,
          column: 1,
        },
      ];

      const metrics = EslintOutputParser.aggregateMetrics(violations, repoName);

      const componentMetrics = metrics.filter(
        (m) => m.metricName === 'eslint_cds.violations_by_component',
      );

      const buttonWarning = componentMetrics.find(
        (m) => m.tags.component === 'Button' && m.tags.severity === 'warning',
      );
      expect(buttonWarning?.value).toBe(1);

      const buttonError = componentMetrics.find(
        (m) => m.tags.component === 'Button' && m.tags.severity === 'error',
      );
      expect(buttonError?.value).toBe(1);

      const tooltipWarning = componentMetrics.find(
        (m) => m.tags.component === 'Tooltip' && m.tags.severity === 'warning',
      );
      expect(tooltipWarning?.value).toBe(1);
    });

    it('should tag all metrics with the repository name', () => {
      const violations: CdsViolation[] = [
        {
          ruleId: '@coinbase/cds/no-v7-imports',
          severity: 2,
          message: 'Do not use v7 imports',
          filePath: 'src/A.tsx',
          line: 1,
          column: 1,
        },
      ];

      const metrics = EslintOutputParser.aggregateMetrics(violations, repoName);

      for (const m of metrics) {
        expect(m.tags.repository).toBe(repoName);
      }
    });

    it('should return zero-count totals when no violations exist', () => {
      const metrics = EslintOutputParser.aggregateMetrics([], repoName);

      const totalMetrics = metrics.filter((m) => m.metricName === 'eslint_cds.total_violations');
      expect(totalMetrics).toHaveLength(2);
      expect(totalMetrics.every((m) => m.value === 0)).toBe(true);
    });
  });
});
