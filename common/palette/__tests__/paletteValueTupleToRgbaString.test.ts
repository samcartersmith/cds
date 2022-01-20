import { spectrumConfigs } from '../../spectrum/spectrumConfigs';
import { paletteValueTupleToRgbaString } from '../paletteValueTupleToRgbaString';

describe('paletteValueTupleToRgbaString', () => {
  it('gets the correct rgb value for spectrum alias in light mode', () => {
    expect(paletteValueTupleToRgbaString(['gray100', 1], 'light')).toEqual(
      `rgba(${spectrumConfigs.base.light.gray100.join(',')},1)`,
    );
  });

  it('gets the correct rgb value for spectrum alias with opacity in light mode', () => {
    expect(paletteValueTupleToRgbaString(['blue90', 0.33], 'light')).toEqual(
      `rgba(${spectrumConfigs.base.light.blue90.join(',')},${0.33})`,
    );
  });

  it('gets the correct rgb value for spectrum alias in dark mode', () => {
    expect(paletteValueTupleToRgbaString(['gray100', 1], 'dark')).toEqual(
      `rgba(${spectrumConfigs.base.dark.gray100.join(',')},1)`,
    );
  });

  it('gets the correct rgb value for spectrum alias with opacity in dark mode', () => {
    expect(paletteValueTupleToRgbaString(['blue90', 0.33], 'dark')).toEqual(
      `rgba(${spectrumConfigs.base.dark.blue90.join(',')},${0.33})`,
    );
  });
});
