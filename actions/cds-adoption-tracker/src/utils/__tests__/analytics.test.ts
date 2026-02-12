import { logMetric } from '@cbhq/client-analytics';

import { type ComponentStats, type IllustrationStats } from '../../types';
import { logAllComponentStats, logCount, logIllustrationStats } from '../analytics';

jest.mock('@cbhq/client-analytics', () => ({
  init: jest.fn(),
  logMetric: jest.fn(),
  MetricType: { distribution: 'distribution' },
  PlatformName: { server: 'server' },
}));

const mockLogMetric = logMetric as jest.Mock;

describe('logCount', () => {
  it('calls logMetric with correct metric name, tags, and value', () => {
    logCount(5, 'Button', true, '@cbhq/cds-web', '8.0.0', 'my-repo');

    expect(mockLogMetric).toHaveBeenCalledWith({
      metricName: 'cds_adoption.distribution',
      metricType: 'distribution',
      tags: {
        component: 'Button',
        page_key: 'ui_systems_adoption',
        isCDS: true,
        import_path: '@cbhq/cds-web',
        version: '8.0.0',
        repo: 'my-repo',
      },
      value: 5,
    });
  });
});

describe('logAllComponentStats', () => {
  it('calls logMetric for each CDS stat with isCDS true and each non-CDS stat with isCDS false', () => {
    const cdsStats: ComponentStats[] = [
      {
        name: 'Button',
        timesUsed: 3,
        filePath: '/a.tsx',
        importPath: '@cbhq/cds-web',
        version: '8.0.0',
      },
    ];
    const nonCdsStats: ComponentStats[] = [
      {
        name: 'Card',
        timesUsed: 2,
        filePath: '/b.tsx',
        importPath: 'external-lib',
        version: '1.0.0',
      },
    ];

    logAllComponentStats(cdsStats, nonCdsStats, 'my-repo');

    expect(mockLogMetric).toHaveBeenCalledWith(
      expect.objectContaining({
        tags: expect.objectContaining({ component: 'Button', isCDS: true }),
        value: 3,
      }),
    );
    expect(mockLogMetric).toHaveBeenCalledWith(
      expect.objectContaining({
        tags: expect.objectContaining({ component: 'Card', isCDS: false }),
        value: 2,
      }),
    );
  });

  it('does not call logMetric when given empty arrays', () => {
    mockLogMetric.mockClear();

    logAllComponentStats([], [], 'my-repo');

    expect(mockLogMetric).not.toHaveBeenCalled();
  });
});

describe('logIllustrationStats', () => {
  it('calls logMetric with illustration metric name and correct tags', () => {
    const stats: IllustrationStats[] = [
      {
        componentType: 'HeroSquare',
        illustrationName: 'bank',
        timesUsed: 4,
        importPath: '@cbhq/cds-illustrations',
        version: '4.0.0',
      },
    ];

    logIllustrationStats(stats, 'my-repo');

    expect(mockLogMetric).toHaveBeenCalledWith({
      metricName: 'cds_adoption.illustration_usage',
      metricType: 'distribution',
      tags: {
        component_type: 'HeroSquare',
        illustration_name: 'bank',
        page_key: 'ui_systems_adoption',
        import_path: '@cbhq/cds-illustrations',
        version: '4.0.0',
        repo: 'my-repo',
      },
      value: 4,
    });
  });

  it('does not call logMetric when given empty array', () => {
    mockLogMetric.mockClear();

    logIllustrationStats([], 'my-repo');

    expect(mockLogMetric).not.toHaveBeenCalled();
  });
});
