import { spectrumConfigs } from '../../spectrum/spectrumConfigs';
import { dark,light } from '../../spectrum/spectrumRgbArray';
import { PaletteAlias } from '../../types';
import { defaultPalette } from '../constants';
import { paletteAliasToRgbaString } from '../paletteAliasToRgbaString';

describe('paletteAliasToRgbaString', () => {
  it('gets the correct rgb value for spectrum alias in light mode', () => {
    for (const [palette, paletteValue] of Object.entries(defaultPalette)) {
      let expectedRgbaVal = '';
      if (typeof paletteValue !== 'string') {
        const [color, alpha] = paletteValue;
        expectedRgbaVal = `rgba(${spectrumConfigs.base.light[color as keyof typeof light].join(
          ',',
        )},${[alpha]})`;
      } else {
        expectedRgbaVal = `rgba(${spectrumConfigs.base.light[
          paletteValue as keyof typeof light
        ].join(',')},1)`;
      }

      expect(paletteAliasToRgbaString(palette as PaletteAlias, 'light')).toEqual(expectedRgbaVal);
    }
  });

  it('gets the correct rgb value for spectrum alias in dark mode', () => {
    for (const [palette, paletteValue] of Object.entries(defaultPalette)) {
      let expectedRgbaVal = '';
      if (typeof paletteValue !== 'string') {
        const [color, alpha] = paletteValue;
        expectedRgbaVal = `rgba(${spectrumConfigs.base.dark[color as keyof typeof dark].join(
          ',',
        )},${[alpha]})`;
      } else {
        expectedRgbaVal = `rgba(${spectrumConfigs.base.dark[paletteValue as keyof typeof dark].join(
          ',',
        )},1)`;
      }

      expect(paletteAliasToRgbaString(palette as PaletteAlias, 'dark')).toEqual(expectedRgbaVal);
    }
  });
});
