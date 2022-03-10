import { spectrumConfigs } from '../../spectrum/spectrumConfigs';
import { paletteValueToRgbaArray } from '../paletteValueToRgbaArray';

const blue60Light = [...spectrumConfigs.base.light.blue60, 1];
const green60Dark = [...spectrumConfigs.base.dark.green60, 1];

describe('paletteValueToRgbaArray', () => {
  it('returns correct value for light spectrum', () => {
    expect(paletteValueToRgbaArray('blue60', 'light')).toEqual(blue60Light);
  });

  it('returns correct value for dark spectrum', () => {
    expect(paletteValueToRgbaArray('green60', 'dark')).toEqual(green60Dark);
  });

  it('properly caches values after lookup', () => {
    expect(paletteValueToRgbaArray.cache.get('blue60-1-light')).toEqual(blue60Light);
    expect(paletteValueToRgbaArray.cache.get('green60-1-dark')).toEqual(green60Dark);
  });
});
