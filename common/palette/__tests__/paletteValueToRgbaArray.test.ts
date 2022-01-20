import { spectrumConfigs } from '../../spectrum/spectrumConfigs';
import { paletteValueToRgbaArray, rgbaArraysCache } from '../paletteValueToRgbaArray';

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
    expect(rgbaArraysCache['blue60-1-light']).toEqual(blue60Light);
    expect(rgbaArraysCache['green60-1-dark']).toEqual(green60Dark);
  });
});
