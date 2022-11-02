import { CustomMap } from '../CustomMap';

describe('CustomMap', () => {
  it('asObject', async () => {
    const mockMap = new CustomMap([
      ['foreground', 'foreground_id'],
      ['background', 'background_id'],
    ]);

    expect(mockMap.asObject).toEqual({ foreground: 'foreground_id', background: 'background_id' });
  });

  it('asSortedObject', async () => {
    const mockMap = new CustomMap([
      ['foreground', 'foreground_id'],
      ['background', 'background_id'],
    ] as const);

    expect(mockMap.asSortedObject).toEqual({
      background: 'background_id',
      foreground: 'foreground_id',
    });
  });
});
