/**
 * Data transformation functions for converting Figma API responses into MetricData
 * This module handles the transformation of Figma Library Analytics data into
 * structured metrics ready for submission to Datadog.
 */

import type {
  LibraryAnalyticsComponentActionsByAsset,
  LibraryAnalyticsComponentActionsByTeam,
  LibraryAnalyticsComponentUsagesByAsset,
  LibraryAnalyticsComponentUsagesByFile,
} from '@figma/rest-api-spec';
import { MetricType } from '@cbhq/client-analytics';

import type { MetricData } from './analytics';

/**
 * Transform component actions data grouped by team into metric data
 * Metric: figma_lib.actions.team
 * Tags: figma_team, figma_workspace, library_key, library_name, action_type
 */
export function transformActionsTeamData(
  rows: LibraryAnalyticsComponentActionsByTeam[],
  libraryFileKey: string,
  libraryName: string,
): { metrics: MetricData[]; draftsOmitted: number } {
  const metrics: MetricData[] = [];
  let draftsOmitted = 0;

  for (const row of rows) {
    // Skip draft entries
    if (row.team_name === '<Drafts>') {
      draftsOmitted++;
      continue;
    }

    // Create metric for insertions
    metrics.push({
      metricName: 'figma_lib.actions.team',
      metricType: MetricType.gauge,
      value: row.insertions,
      tags: {
        figma_team: row.team_name,
        library_key: libraryFileKey,
        library_name: libraryName,
        action_type: 'insertion',
      },
    });

    // Create metric for detachments
    metrics.push({
      metricName: 'figma_lib.actions.team',
      metricType: MetricType.gauge,
      value: row.detachments,
      tags: {
        figma_team: row.team_name,
        library_key: libraryFileKey,
        library_name: libraryName,
        action_type: 'detachment',
      },
    });
  }

  return { metrics, draftsOmitted };
}

/**
 * Transform component actions data grouped by component into metric data
 * Metric: figma_lib.actions.component
 * Tags: component_key, component_name_extended, library_key, library_name, action_type
 */
export function transformActionsComponentData(
  rows: LibraryAnalyticsComponentActionsByAsset[],
  libraryFileKey: string,
  libraryName: string,
): MetricData[] {
  const metrics: MetricData[] = [];

  // maps to track the summation of all component variant insertions and detachments
  const totalComponentInsertions = new Map<string, number>();
  const totalComponentDetachments = new Map<string, number>();
  for (const row of rows) {
    const componentName = row.component_set_name ?? row.component_name;

    // increase total sum of component insertions for this variant
    totalComponentInsertions.set(
      componentName,
      (totalComponentInsertions.get(componentName) ?? 0) + row.insertions,
    );

    // increase total sum of component detachments for this variant
    totalComponentDetachments.set(
      componentName,
      (totalComponentDetachments.get(componentName) ?? 0) + row.detachments,
    );

    // we are not planning to collect attachment/detachment metrics for component variants at this time
    // // if the component is part of a component set, its name is really the component "Variant"
    // if (row.component_set_name !== undefined) {
    //   const commonTags: MetricData['tags'] = {
    //     component_key: row.component_key,
    //     component_name: row.component_set_name ?? row.component_name,
    //     component_variant: row.component_name.replace(/, /g, '&'),
    //     library_key: libraryFileKey,
    //     library_name: libraryName,
    //   };

    //   // Create metric for insertions
    //   metrics.push({
    //     metricName: 'figma_lib.actions.component',
    //     metricType: MetricType.gauge,
    //     value: row.insertions,
    //     tags: {
    //       ...commonTags,
    //       action_type: 'insertion',
    //     },
    //   });

    //   // Create metric for detachments
    //   metrics.push({
    //     metricName: 'figma_lib.actions.component',
    //     metricType: MetricType.gauge,
    //     value: row.detachments,
    //     tags: {
    //       ...commonTags,
    //       action_type: 'detachment',
    //     },
    //   });
    // }
  }

  totalComponentInsertions.forEach((insertions, componentName) => {
    metrics.push({
      metricName: 'figma_lib.actions.component',
      metricType: MetricType.gauge,
      value: insertions,
      tags: {
        component_name: componentName,
        library_key: libraryFileKey,
        library_name: libraryName,
        action_type: 'insertion',
      },
    });
  });

  totalComponentDetachments.forEach((detachments, componentName) => {
    metrics.push({
      metricName: 'figma_lib.actions.component',
      metricType: MetricType.gauge,
      value: detachments,
      tags: {
        component_name: componentName,
        library_key: libraryFileKey,
        library_name: libraryName,
        action_type: 'detachment',
      },
    });
  });

  return metrics;
}

/**
 * Transform component usage data grouped by component into metric data
 * Metric: figma_lib.usage.component
 * Tags: component_key, component_name_extended, library_key, library_name, usage_type
 */
export function transformUsageComponentData(
  rows: LibraryAnalyticsComponentUsagesByAsset[],
  libraryFileKey: string,
  libraryName: string,
): MetricData[] {
  const metrics: MetricData[] = [];

  // map to track the summation of all component variant usages
  const totalComponentUsages = new Map<string, number>();
  for (const row of rows) {
    const componentName = row.component_set_name ?? row.component_name;

    // increase total sum of component usage for this variant
    totalComponentUsages.set(
      componentName,
      (totalComponentUsages.get(componentName) ?? 0) + row.usages,
    );

    // if the component is part of a component set, its name is really the component "Variant"
    if (row.component_set_name !== undefined) {
      const componentVariantName = row.component_name.replace(/, /g, '&');

      const commonTags: MetricData['tags'] = {
        component_key: row.component_key,
        library_key: libraryFileKey,
        library_name: libraryName,
        component_name: componentName,
        component_variant: componentVariantName,
      };

      // Create metric for total instances
      metrics.push({
        metricName: 'figma_lib.usage.component',
        metricType: MetricType.gauge,
        value: row.usages,
        tags: {
          ...commonTags,
          usage_type: 'variant_total',
        },
      });

      // Create metric for number of files
      metrics.push({
        metricName: 'figma_lib.usage.component',
        metricType: MetricType.gauge,
        value: row.files_using,
        tags: {
          ...commonTags,
          usage_type: 'variant_files',
        },
      });

      // Create metric for number of teams
      metrics.push({
        metricName: 'figma_lib.usage.component',
        metricType: MetricType.gauge,
        value: row.teams_using,
        tags: {
          ...commonTags,
          usage_type: 'variant_teams',
        },
      });
    }
  }

  totalComponentUsages.forEach((usage, componentName) => {
    metrics.push({
      metricName: 'figma_lib.usage.component',
      metricType: MetricType.gauge,
      value: usage,
      tags: {
        library_key: libraryFileKey,
        library_name: libraryName,
        component_name: componentName,
        usage_type: 'total',
      },
    });
  });

  return metrics;
}

/**
 * Transform component usage data grouped by file into metric data
 * Metric: figma_lib.usage.file
 * Tags: file_name, figma_workspace, figma_team, library_key, library_name
 */
export function transformUsageFileData(
  rows: LibraryAnalyticsComponentUsagesByFile[],
  libraryFileKey: string,
  libraryName: string,
): { metrics: MetricData[]; draftsOmitted: number } {
  const metrics: MetricData[] = [];
  let draftsOmitted = 0;

  // map to track a team's usage of the library across all of its files
  const teamsUsages = new Map<string, { usage: number; team: string }>();
  for (const row of rows) {
    // Skip draft entries
    if (row.team_name === '<Drafts>') {
      draftsOmitted++;
      continue;
    }

    // there could be teams with the same name in different workspaces, so we need to use the workspace name to differentiate them
    const key = row.workspace_name ? `${row.workspace_name}|${row.team_name}` : row.team_name;

    // increase team sum of component usage for this variant
    if (teamsUsages.has(key)) {
      const prevUsage = teamsUsages.get(key)?.usage ?? 0;
      teamsUsages.set(key, {
        usage: prevUsage + row.usages,
        team: row.team_name,
      });
    } else {
      teamsUsages.set(key, {
        usage: row.usages,
        team: row.team_name,
      });
    }

    metrics.push({
      metricName: 'figma_lib.usage.file',
      metricType: MetricType.gauge,
      value: row.usages,
      tags: {
        file_name: row.file_name,
        figma_team: row.team_name,
        library_key: libraryFileKey,
        library_name: libraryName,
        usage_type: 'files',
      },
    });
  }

  teamsUsages.forEach(({ usage, team }) => {
    metrics.push({
      metricName: 'figma_lib.usage.file',
      metricType: MetricType.gauge,
      value: usage,
      tags: {
        library_key: libraryFileKey,
        library_name: libraryName,
        figma_team: team,
        usage_type: 'teams',
      },
    });
  });

  return { metrics, draftsOmitted };
}
