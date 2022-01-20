import { spectrumConfigs } from '../../spectrum/spectrumConfigs';
import { paletteValueTupleToRgbaArray } from '../paletteValueTupleToRgbaArray';

describe('paletteValueTupleToRgbaArray', () => {
  it('returns correct value for light spectrum', () => {
    expect(paletteValueTupleToRgbaArray(['blue60', 1], 'light')).toEqual([
      ...spectrumConfigs.base.light.blue60,
      1,
    ]);
  });

  it('returns correct value for dark spectrum', () => {
    expect(paletteValueTupleToRgbaArray(['blue60', 1], 'dark')).toEqual([
      ...spectrumConfigs.base.dark.blue60,
      1,
    ]);
  });
});
