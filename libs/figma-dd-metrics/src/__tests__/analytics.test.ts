import { flushQueue, init, logMetric, MetricType } from '@cbhq/client-analytics';

import {
  logAllCollectedMetrics,
  logMetricsInBatches,
  type MetricData,
  PAGE_KEY,
  PROJECT_NAME,
  setupAnalytics,
} from '../analytics';

jest.mock('@cbhq/client-analytics');

describe('analytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setupAnalytics', () => {
    it('should initialize analytics with correct configuration', () => {
      setupAnalytics();

      expect(init).toHaveBeenCalledWith({
        batchMetricsThreshold: 1,
        headers: { Origin: 'https://www.coinbase.com' },
        isProd: true,
        platform: 'server',
        projectName: PROJECT_NAME,
        showDebugLogging: false,
        onError: expect.any(Function),
        version: '1.0',
      });
    });
  });

  describe('logAllCollectedMetrics', () => {
    it('should log all metrics with page_key tag', () => {
      const mockMetrics: MetricData[] = [
        {
          metricName: 'test.metric',
          metricType: MetricType.gauge,
          value: 42,
          tags: {
            component_key: 'comp-1',
            library_key: 'lib-1',
          },
        },
        {
          metricName: 'test.metric2',
          metricType: MetricType.gauge,
          value: 100,
          tags: {
            component_key: 'comp-2',
            library_key: 'lib-1',
          },
        },
      ];

      logAllCollectedMetrics(mockMetrics);

      expect(logMetric).toHaveBeenCalledTimes(2);
      expect(logMetric).toHaveBeenNthCalledWith(1, {
        metricName: 'test.metric',
        metricType: MetricType.gauge,
        value: 42,
        tags: {
          page_key: PAGE_KEY,
          component_key: 'comp-1',
          library_key: 'lib-1',
        },
      });
      expect(logMetric).toHaveBeenNthCalledWith(2, {
        metricName: 'test.metric2',
        metricType: MetricType.gauge,
        value: 100,
        tags: {
          page_key: PAGE_KEY,
          component_key: 'comp-2',
          library_key: 'lib-1',
        },
      });
    });

    it('should handle empty metrics array', () => {
      logAllCollectedMetrics([]);

      expect(logMetric).not.toHaveBeenCalled();
    });

    it('should preserve existing tags and add page_key', () => {
      const mockMetrics: MetricData[] = [
        {
          metricName: 'test.metric',
          metricType: MetricType.gauge,
          value: 42,
          tags: {
            existing_tag: 'value',
            another_tag: 'another_value',
          },
        },
      ];

      logAllCollectedMetrics(mockMetrics);

      expect(logMetric).toHaveBeenCalledWith({
        metricName: 'test.metric',
        metricType: MetricType.gauge,
        value: 42,
        tags: {
          page_key: PAGE_KEY,
          existing_tag: 'value',
          another_tag: 'another_value',
        },
      });
    });
  });

  describe('logMetricsInBatches', () => {
    let consoleLogSpy: jest.SpyInstance;
    let setTimeoutSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      (flushQueue as jest.Mock).mockResolvedValue(undefined);
      // Mock setTimeout to resolve immediately to speed up tests
      setTimeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation(((
        callback: () => void,
      ) => {
        callback();
        return 0 as any;
      }) as any);
    });

    afterEach(() => {
      consoleLogSpy.mockRestore();
      setTimeoutSpy.mockRestore();
    });

    it('should send metrics in batches', async () => {
      const mockMetrics: MetricData[] = Array.from({ length: 500 }, (_, i) => ({
        metricName: `test.metric${i}`,
        metricType: MetricType.gauge,
        value: i,
        tags: { index: String(i) },
      }));

      await logMetricsInBatches(mockMetrics, 250);

      // Should log all 500 metrics
      expect(logMetric).toHaveBeenCalledTimes(500);

      // Should flush twice (once per batch)
      expect(flushQueue).toHaveBeenCalledTimes(2);

      // Should log batch progress
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Sending batch 1/2'));
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Sending batch 2/2'));
    });

    it('should use default batch size of 250', async () => {
      const mockMetrics: MetricData[] = Array.from({ length: 300 }, (_, i) => ({
        metricName: `test.metric${i}`,
        metricType: MetricType.gauge,
        value: i,
        tags: { index: String(i) },
      }));

      await logMetricsInBatches(mockMetrics);

      // Should create 2 batches (250 + 50)
      expect(flushQueue).toHaveBeenCalledTimes(2);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('batch 1/2 (250 metrics)'),
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('batch 2/2 (50 metrics)'));
    });

    it('should handle single batch', async () => {
      const mockMetrics: MetricData[] = Array.from({ length: 100 }, (_, i) => ({
        metricName: `test.metric${i}`,
        metricType: MetricType.gauge,
        value: i,
        tags: { index: String(i) },
      }));

      await logMetricsInBatches(mockMetrics, 250);

      expect(logMetric).toHaveBeenCalledTimes(100);
      expect(flushQueue).toHaveBeenCalledTimes(1);

      // Should not log "waiting" message for last batch
      expect(consoleLogSpy).not.toHaveBeenCalledWith(expect.stringContaining('Waiting 30 seconds'));
    });

    it('should handle empty metrics array', async () => {
      await logMetricsInBatches([]);

      expect(logMetric).not.toHaveBeenCalled();
      expect(flushQueue).not.toHaveBeenCalled();
    });

    it('should use custom batch size', async () => {
      const mockMetrics: MetricData[] = Array.from({ length: 150 }, (_, i) => ({
        metricName: `test.metric${i}`,
        metricType: MetricType.gauge,
        value: i,
        tags: { index: String(i) },
      }));

      await logMetricsInBatches(mockMetrics, 50);

      // Should create 3 batches (50 + 50 + 50)
      expect(flushQueue).toHaveBeenCalledTimes(3);
    });
  });

  describe('constants', () => {
    it('should export correct PAGE_KEY', () => {
      expect(PAGE_KEY).toBe('ui_systems_adoption');
    });

    it('should export correct PROJECT_NAME', () => {
      expect(PROJECT_NAME).toBe('adoption_tracker');
    });
  });
});
