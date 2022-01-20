import { spectrumConfigs } from '../../spectrum/spectrumConfigs';
import { paletteValueToRgbaString } from '../paletteValueToRgbaString';

const gray100Light = `rgba(${spectrumConfigs.base.light.gray100.join(',')},1)`;
const blue90Light = `rgba(${spectrumConfigs.base.light.blue90.join(',')},${0.33})`;
const gray100Dark = `rgba(${spectrumConfigs.base.dark.gray100.join(',')},1)`;
const blue90Dark = `rgba(${spectrumConfigs.base.dark.blue90.join(',')},${0.33})`;

describe('paletteValueToRgbaString', () => {
  it('gets the correct rgb value for spectrum alias in light mode', () => {
    expect(paletteValueToRgbaString('gray100', 'light')).toEqual(gray100Light);
  });

  it('gets the correct rgb value for spectrum alias with opacity in light mode', () => {
    expect(paletteValueToRgbaString(['blue90', 0.33], 'light')).toEqual(blue90Light);
  });

  it('gets the correct rgb value for spectrum alias in dark mode', () => {
    expect(paletteValueToRgbaString('gray100', 'dark')).toEqual(gray100Dark);
  });

  it('gets the correct rgb value for spectrum alias with opacity in dark mode', () => {
    expect(paletteValueToRgbaString(['blue90', 0.33], 'dark')).toEqual(blue90Dark);
  });

  it('properly caches values after lookup', () => {
    expect(paletteValueToRgbaString.cache.get('gray100-1-light')).toEqual(gray100Light);
    expect(paletteValueToRgbaString.cache.get('blue90-0.33-light')).toEqual(blue90Light);
    expect(paletteValueToRgbaString.cache.get('gray100-1-dark')).toEqual(gray100Dark);
    expect(paletteValueToRgbaString.cache.get('blue90-0.33-dark')).toEqual(blue90Dark);
  });
});
