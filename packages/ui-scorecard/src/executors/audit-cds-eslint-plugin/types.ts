import { MetricType } from '@cbhq/client-analytics';

export type AnalyticsPlatform = 'web' | 'ios' | 'android' | 'server';

export type AuditCdsEslintPluginOptions = {
  eslintOutputFile: string;
  projectName: string;
  repositoryName: string;
  platform?: AnalyticsPlatform;
  sendEventsToProd?: boolean;
  verbose?: boolean;
};

export type EslintFileResult = {
  filePath: string;
  messages: EslintMessage[];
};

export type EslintMessage = {
  ruleId: string | null;
  severity: number;
  message: string;
  line: number;
  column: number;
};

export type CdsViolation = {
  ruleId: string;
  severity: number;
  message: string;
  filePath: string;
  line: number;
  column: number;
};

export type AggregatedMetric = {
  metricName: string;
  metricType: MetricType;
  value: number;
  tags: Record<string, string>;
};
