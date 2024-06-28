/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import { a11yLintRepos } from ':cds-website/data/__generated__/a11yLintConfig/a11yLintRepos';

// flag for toggling module to show eslint warnings in complex repo by project
export const showComplexRepoBreakdownByProject = false;

export type DisabledRule = {
  filePath: string;
  lineNumber: number;
  rule: string;
};

export type GroupedByRuleId = {
  [key: string]: {
    filePath: string;
    line: number;
    column: number;
    message: string;
  }[];
};

export type LintMessage = {
  ruleId: string;
  severity: number;
  message: string;
  line: number;
  column: number;
  nodeType: string;
  endLine: number;
  endColumn: number;
};

export type LintResult = {
  filePath: string;
  messages: LintMessage[];
};

export type A11yLintListCellType = {
  id: string;
  isActive: boolean;
  repoData: A11yLintConfig;
  index: number;
  onPress: (id: string) => void;
};

export type TargetProject = {
  name: string;
  projectPath: string;
  repoType: string;
};

export type A11yLintConfig = {
  id: string;
  customSetupCommands?: string[];
  name: string;
  repo: string;
  repoType: string;
  targetProjects?: TargetProject[];
  workspaceDir?: string;
};

export type ProjectData = {
  [key: string]: LintResult[];
};

export const getA11yLintDataByRepo = (id: string): ProjectData => {
  const projectData: ProjectData = {};

  const repoConfig = a11yLintRepos.find((repo) => repo.id === id);

  if (
    repoConfig?.targetProjects &&
    repoConfig.repoType === 'complex' &&
    showComplexRepoBreakdownByProject
  ) {
    // Complex repo types have multiple target projects within them
    // Only call if showComplexRepoBreakdownByProject is true and we want to display breakdown by project
    repoConfig.targetProjects.forEach((targetProject) => {
      projectData[targetProject.name] =
        require(`@site/static/data/__generated__/a11yLintConfig/${id}/${targetProject.name}.json`) as LintResult[];
    });
  }
  projectData.fullRepo =
    require(`@site/static/data/__generated__/a11yLintConfig/${id}/${id}-fullRepo.json`) as LintResult[];

  return projectData;
};

export const getA11yDisableLintDataByRepo = (id: string) => {
  return require(`@site/static/data/__generated__/a11yLintConfig/${id}/disabled-a11y-rules.json`) as DisabledRule[];
};

export const groupMessagesByRuleId = (lintResults: LintResult[]) => {
  const groupedByRuleId: GroupedByRuleId = {};

  lintResults?.forEach((lintItem) => {
    lintItem?.messages?.forEach((message) => {
      if (!groupedByRuleId[message.ruleId]) {
        groupedByRuleId[message.ruleId] = [];
      }
      groupedByRuleId[message.ruleId].push({
        filePath: lintItem.filePath,
        line: message.line,
        column: message.column,
        message: message.message,
      });
    });
  });

  return groupedByRuleId;
};

export const formatFilePath = (fullPath: string, truncateRepo?: boolean) => {
  const marker = '/.a11yLintConfig/repos/';
  const baseIndex = fullPath.indexOf(marker);
  if (baseIndex !== -1) {
    // Initial end of marker just after the known part
    let endMarkerIndex = baseIndex + marker.length;

    // Extend the marker if truncation of additional directories is requested
    if (truncateRepo) {
      const additionalDirsToSkip = 2; // Number of additional directory slashes to skip
      let slashCount = 0;
      while (slashCount < additionalDirsToSkip && endMarkerIndex < fullPath.length) {
        if (fullPath.charAt(endMarkerIndex) === '/') {
          slashCount++;
        }
        endMarkerIndex++;
        if (slashCount === additionalDirsToSkip) {
          break;
        }
      }
    }

    // Extract the path starting right after the adjusted marker
    return fullPath.substring(endMarkerIndex);
  }
  return fullPath; // Return the original path if the marker is not found
};

export const groupByRule = (
  disablesData: DisabledRule[],
): Record<string, Omit<DisabledRule, 'rule'>[]> => {
  const groupedData: Record<string, Omit<DisabledRule, 'rule'>[]> = {};

  disablesData.forEach(({ filePath, lineNumber, rule }) => {
    if (!groupedData[rule]) {
      groupedData[rule] = [];
    }
    groupedData[rule].push({ filePath, lineNumber });
  });

  return groupedData;
};

export const getTotalWarningsByRepo = (id: string) => {
  const projectData = getA11yLintDataByRepo(id);
  let totalWarnings = 0;

  // Iterate through all keys in the project data which could be multiple projects or 'fullRepo'
  Object.values(projectData).forEach((lintResults) => {
    lintResults.forEach((lintResult) => {
      // Each lintResult has an array of messages; count all entries
      totalWarnings += lintResult.messages.length;
    });
  });

  return totalWarnings;
};

export const getTotalDisabledRulesByRepo = (id: string) => {
  const disabledRules = getA11yDisableLintDataByRepo(id);

  // The total number of disabled rules is simply the length of the array
  return disabledRules.length;
};
