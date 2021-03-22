import { light, dark } from '../../styles/spectrum';
import { getColorFromSpectrumAlias } from '../convertPalette';

describe('getColorFromSpectrumAlias', () => {
  it('gets the correct rgb value for spectrum alias in light mode', () => {
    expect(getColorFromSpectrumAlias('gray100', 'light')).toEqual(
      `rgba(${light.gray100.join(',')},1)`
    );
  });

  it('gets the correct rgb value for spectrum alias with opacity in light mode', () => {
    expect(getColorFromSpectrumAlias(['blue90', 0.33], 'light')).toEqual(
      `rgba(${light.blue90.join(',')},${0.33})`
    );
  });

  it('gets the correct rgb value for spectrum alias in dark mode', () => {
    expect(getColorFromSpectrumAlias('gray100', 'dark')).toEqual(
      `rgba(${dark.gray100.join(',')},1)`
    );
  });

  it('gets the correct rgb value for spectrum alias with opacity in dark mode', () => {
    expect(getColorFromSpectrumAlias(['blue90', 0.33], 'dark')).toEqual(
      `rgba(${dark.blue90.join(',')},${0.33})`
    );
  });
});
