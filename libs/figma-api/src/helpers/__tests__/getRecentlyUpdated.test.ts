import { getRecentlyUpdated } from '../getRecentlyUpdated';

describe('getRecentlyUpdated', () => {
  test('returns the ids of recently updated items', () => {
    const nodes = [
      { node_id: '1', updated_at: '2022-12-01T00:00:00.000Z' },
      { node_id: '2', updated_at: '2022-12-02T00:00:00.000Z' },
      { node_id: '3', updated_at: '2022-12-03T00:00:00.000Z' },
      { node_id: '4', updated_at: '2022-12-04T00:00:00.000Z' },
    ];

    const lastUpdated = '2022-12-02T00:00:00.000Z';
    const expected = ['3', '4'];
    const result = getRecentlyUpdated({ nodes, lastUpdated });
    expect(result).toEqual(expected);
  });
});
