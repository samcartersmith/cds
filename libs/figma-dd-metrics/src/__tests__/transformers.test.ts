import type {
  LibraryAnalyticsComponentActionsByAsset,
  LibraryAnalyticsComponentActionsByTeam,
  LibraryAnalyticsComponentUsagesByAsset,
  LibraryAnalyticsComponentUsagesByFile,
} from '@figma/rest-api-spec';
import { MetricType } from '@cbhq/client-analytics';

import {
  transformActionsComponentData,
  transformActionsTeamData,
  transformUsageComponentData,
  transformUsageFileData,
} from '../transformers';

describe('transformers', () => {
  const mockLibraryFileKey = 'abc123';
  const mockLibraryName = 'Test Library';

  describe('transformActionsTeamData', () => {
    const mockTeamData: LibraryAnalyticsComponentActionsByTeam[] = [
      {
        team_name: 'Design Team',
        workspace_name: 'Main Workspace',
        week: '2024-11-10',
        insertions: 42,
        detachments: 5,
      },
      {
        team_name: 'Engineering Team',
        workspace_name: 'Main Workspace',
        week: '2024-11-10',
        insertions: 28,
        detachments: 3,
      },
      {
        team_name: '<Drafts>',
        workspace_name: 'Main Workspace',
        week: '2024-11-10',
        insertions: 10,
        detachments: 2,
      },
    ];

    it('should transform team action data into metrics', () => {
      const { metrics, draftsOmitted } = transformActionsTeamData(
        mockTeamData,
        mockLibraryFileKey,
        mockLibraryName,
      );

      // Should create 2 metrics per team (insertion + detachment), excluding drafts
      expect(metrics).toHaveLength(4); // 2 teams * 2 metrics each
      expect(draftsOmitted).toBe(1);

      // Verify first team insertion metric
      expect(metrics[0]).toEqual({
        metricName: 'figma_lib.actions.team',
        metricType: MetricType.gauge,
        value: 42,
        tags: {
          figma_team: 'Design Team',
          library_key: mockLibraryFileKey,
          library_name: mockLibraryName,
          action_type: 'insertion',
        },
      });

      // Verify first team detachment metric
      expect(metrics[1]).toEqual({
        metricName: 'figma_lib.actions.team',
        metricType: MetricType.gauge,
        value: 5,
        tags: {
          figma_team: 'Design Team',
          library_key: mockLibraryFileKey,
          library_name: mockLibraryName,
          action_type: 'detachment',
        },
      });
    });

    it('should filter out draft entries', () => {
      const { metrics, draftsOmitted } = transformActionsTeamData(
        mockTeamData,
        mockLibraryFileKey,
        mockLibraryName,
      );

      expect(draftsOmitted).toBe(1);
      expect(metrics.every((m) => m.tags.figma_team !== '<Drafts>')).toBe(true);
    });

    it('should return empty metrics for empty input', () => {
      const { metrics, draftsOmitted } = transformActionsTeamData(
        [],
        mockLibraryFileKey,
        mockLibraryName,
      );

      expect(metrics).toHaveLength(0);
      expect(draftsOmitted).toBe(0);
    });
  });

  describe('transformActionsComponentData', () => {
    const mockComponentData: LibraryAnalyticsComponentActionsByAsset[] = [
      {
        component_key: 'comp-1',
        component_name: 'Button',
        component_set_name: undefined,
        week: '2024-11-10',
        insertions: 100,
        detachments: 10,
      },
      {
        component_key: 'comp-2',
        component_name: 'Primary',
        component_set_name: 'Button',
        week: '2024-11-10',
        insertions: 50,
        detachments: 5,
      },
      // Add another variant for Button to test aggregation
      {
        component_key: 'comp-3',
        component_name: 'Secondary',
        component_set_name: 'Button',
        week: '2024-11-10',
        insertions: 30,
        detachments: 3,
      },
    ];

    it('should transform component action data into aggregated metrics', () => {
      const metrics = transformActionsComponentData(
        mockComponentData,
        mockLibraryFileKey,
        mockLibraryName,
      );

      // Should aggregate by component name.
      // 'Button' (standalone) -> 1 set of metrics
      // 'Button' (from Primary and Secondary) -> aggregated into the same 'Button' set of metrics?
      // Actually, logic is `row.component_set_name ?? row.component_name`.
      // Row 1: name='Button'.
      // Row 2: set='Button'.
      // Row 3: set='Button'.
      // All three map to 'Button'. So we expect 1 aggregated insertion metric and 1 aggregated detachment metric.

      expect(metrics).toHaveLength(2);

      const totalInsertions = 100 + 50 + 30;
      const totalDetachments = 10 + 5 + 3;

      // Verify aggregated insertion metric
      expect(metrics[0]).toEqual({
        metricName: 'figma_lib.actions.component',
        metricType: MetricType.gauge,
        value: totalInsertions,
        tags: {
          component_name: 'Button',
          library_key: mockLibraryFileKey,
          library_name: mockLibraryName,
          action_type: 'insertion',
        },
      });

      // Verify aggregated detachment metric
      expect(metrics[1]).toEqual({
        metricName: 'figma_lib.actions.component',
        metricType: MetricType.gauge,
        value: totalDetachments,
        tags: {
          component_name: 'Button',
          library_key: mockLibraryFileKey,
          library_name: mockLibraryName,
          action_type: 'detachment',
        },
      });
    });

    it('should handle distinct components correctly', () => {
      const distinctData: LibraryAnalyticsComponentActionsByAsset[] = [
        {
          component_key: 'comp-1',
          component_name: 'Button',
          component_set_name: undefined,
          week: '2024-11-10',
          insertions: 10,
          detachments: 1,
        },
        {
          component_key: 'comp-4',
          component_name: 'Input',
          component_set_name: undefined,
          week: '2024-11-10',
          insertions: 20,
          detachments: 2,
        },
      ];

      const metrics = transformActionsComponentData(
        distinctData,
        mockLibraryFileKey,
        mockLibraryName,
      );

      expect(metrics).toHaveLength(4); // 2 components * 2 metrics (ins + det)

      const buttonMetric = metrics.find(
        (m) => m.tags.component_name === 'Button' && m.tags.action_type === 'insertion',
      );
      const inputMetric = metrics.find(
        (m) => m.tags.component_name === 'Input' && m.tags.action_type === 'insertion',
      );

      expect(buttonMetric?.value).toBe(10);
      expect(inputMetric?.value).toBe(20);
    });

    it('should return empty metrics for empty input', () => {
      const metrics = transformActionsComponentData([], mockLibraryFileKey, mockLibraryName);

      expect(metrics).toHaveLength(0);
    });
  });

  describe('transformUsageComponentData', () => {
    const mockUsageData: LibraryAnalyticsComponentUsagesByAsset[] = [
      {
        component_key: 'comp-1',
        component_name: 'Button',
        component_set_name: undefined,
        usages: 250,
        files_using: 15,
        teams_using: 8,
      },
      {
        component_key: 'comp-2',
        component_name: 'Primary',
        component_set_name: 'Button',
        usages: 120,
        files_using: 10,
        teams_using: 5,
      },
    ];

    it('should transform component usage data into metrics', () => {
      const metrics = transformUsageComponentData(
        mockUsageData,
        mockLibraryFileKey,
        mockLibraryName,
      );

      // Expected metrics:
      // 1. 'Button' (standalone):
      //    - Contributes to 'total' aggregation for 'Button'.
      //    - Does NOT generate variant metrics (no component_set_name).
      // 2. 'Primary' (variant of Button):
      //    - Contributes to 'total' aggregation for 'Button'.
      //    - Generates 3 variant metrics: variant_total, variant_files, variant_teams.
      //
      // Result:
      // - 1 aggregated 'total' metric for 'Button' (sum: 250 + 120 = 370).
      // - 3 variant metrics for 'Primary'.
      // Total metrics: 4.

      expect(metrics).toHaveLength(4);
    });

    it('should create aggregated total usage metric', () => {
      const metrics = transformUsageComponentData(
        mockUsageData,
        mockLibraryFileKey,
        mockLibraryName,
      );

      const totalMetric = metrics.find(
        (m) => m.tags.component_name === 'Button' && m.tags.usage_type === 'total',
      );

      expect(totalMetric).toEqual({
        metricName: 'figma_lib.usage.component',
        metricType: MetricType.gauge,
        value: 370, // 250 + 120
        tags: {
          library_key: mockLibraryFileKey,
          library_name: mockLibraryName,
          component_name: 'Button',
          usage_type: 'total',
        },
      });
    });

    it('should create variant usage metrics for components in a set', () => {
      const metrics = transformUsageComponentData(
        mockUsageData,
        mockLibraryFileKey,
        mockLibraryName,
      );

      const variantTotal = metrics.find(
        (m) => m.tags.component_key === 'comp-2' && m.tags.usage_type === 'variant_total',
      );
      const variantFiles = metrics.find(
        (m) => m.tags.component_key === 'comp-2' && m.tags.usage_type === 'variant_files',
      );
      const variantTeams = metrics.find(
        (m) => m.tags.component_key === 'comp-2' && m.tags.usage_type === 'variant_teams',
      );

      expect(variantTotal?.value).toBe(120);
      expect(variantFiles?.value).toBe(10);
      expect(variantTeams?.value).toBe(5);

      expect(variantTotal?.tags.component_variant).toBe('Primary');
    });

    it('should replace commas with ampersands in component variant tags', () => {
      const dataWithCommas: LibraryAnalyticsComponentUsagesByAsset[] = [
        {
          component_key: 'comp-commas',
          component_name: 'shape=circle, size=l, variant=initial, color scheme=gray',
          component_set_name: 'Button',
          usages: 10,
          files_using: 1,
          teams_using: 1,
        },
      ];

      const metrics = transformUsageComponentData(
        dataWithCommas,
        mockLibraryFileKey,
        mockLibraryName,
      );

      const variantMetric = metrics.find(
        (m) => m.tags.component_key === 'comp-commas' && m.tags.usage_type === 'variant_total',
      );

      expect(variantMetric?.tags.component_variant).toBe(
        'shape=circle&size=l&variant=initial&color scheme=gray',
      );
    });

    it('should return empty metrics for empty input', () => {
      const metrics = transformUsageComponentData([], mockLibraryFileKey, mockLibraryName);

      expect(metrics).toHaveLength(0);
    });
  });

  describe('transformUsageFileData', () => {
    const mockFileData: LibraryAnalyticsComponentUsagesByFile[] = [
      {
        file_name: 'Marketing Page',
        workspace_name: 'Main Workspace',
        team_name: 'Marketing Team',
        usages: 45,
      },
      {
        file_name: 'Product Page',
        workspace_name: 'Main Workspace',
        team_name: 'Product Team',
        usages: 32,
      },
      {
        file_name: 'Draft File',
        workspace_name: 'Main Workspace',
        team_name: '<Drafts>',
        usages: 10,
      },
    ];

    it('should transform file usage data into metrics', () => {
      const { metrics, draftsOmitted } = transformUsageFileData(
        mockFileData,
        mockLibraryFileKey,
        mockLibraryName,
      );

      // Metrics:
      // 1. File metric for Marketing Page
      // 2. File metric for Product Page
      // 3. Team aggregated metric for Marketing Team
      // 4. Team aggregated metric for Product Team
      // Total: 4 metrics

      expect(metrics).toHaveLength(4);
      expect(draftsOmitted).toBe(1);

      // Check file metric
      const marketingFileMetric = metrics.find(
        (m) => m.tags.file_name === 'Marketing Page' && m.tags.usage_type === 'files',
      );
      expect(marketingFileMetric).toEqual({
        metricName: 'figma_lib.usage.file',
        metricType: MetricType.gauge,
        value: 45,
        tags: {
          file_name: 'Marketing Page',
          figma_team: 'Marketing Team',
          library_key: mockLibraryFileKey,
          library_name: mockLibraryName,
          usage_type: 'files',
        },
      });

      // Check team aggregated metric
      const marketingTeamMetric = metrics.find(
        (m) => m.tags.figma_team === 'Marketing Team' && m.tags.usage_type === 'teams',
      );
      expect(marketingTeamMetric).toEqual({
        metricName: 'figma_lib.usage.file',
        metricType: MetricType.gauge,
        value: 45,
        tags: {
          library_key: mockLibraryFileKey,
          library_name: mockLibraryName,
          figma_team: 'Marketing Team',
          usage_type: 'teams',
        },
      });
    });

    it('should aggregate usage for same team across files', () => {
      const sameTeamData: LibraryAnalyticsComponentUsagesByFile[] = [
        {
          file_name: 'File 1',
          workspace_name: 'Main',
          team_name: 'Design',
          usages: 10,
        },
        {
          file_name: 'File 2',
          workspace_name: 'Main',
          team_name: 'Design',
          usages: 20,
        },
      ];

      const { metrics } = transformUsageFileData(sameTeamData, mockLibraryFileKey, mockLibraryName);

      // 2 file metrics + 1 team metric
      expect(metrics).toHaveLength(3);

      const teamMetric = metrics.find((m) => m.tags.usage_type === 'teams');
      expect(teamMetric?.value).toBe(30);
      expect(teamMetric?.tags.figma_team).toBe('Design');
    });

    it('should filter out draft entries', () => {
      const { metrics, draftsOmitted } = transformUsageFileData(
        mockFileData,
        mockLibraryFileKey,
        mockLibraryName,
      );

      expect(draftsOmitted).toBe(1);
      expect(metrics.every((m) => m.tags.figma_team !== '<Drafts>')).toBe(true);
    });

    it('should return empty metrics for empty input', () => {
      const { metrics, draftsOmitted } = transformUsageFileData(
        [],
        mockLibraryFileKey,
        mockLibraryName,
      );

      expect(metrics).toHaveLength(0);
      expect(draftsOmitted).toBe(0);
    });
  });
});
