import { PaletteAlias } from '@cbhq/cds-common';
import { defaultPalette } from '@cbhq/cds-common/palette/constants';

import { dark, light } from '../../styles/spectrum';
import * as spectrumColors from '../../styles/spectrum';
import {
  paletteAliasToRgbaString,
  paletteConfigToRgbaStrings,
  paletteValueToRgbaArray,
  paletteValueToRgbaString,
} from '../palette';

describe('paletteValueToRgbaString', () => {
  it('gets the correct rgb value for spectrum alias in light mode', () => {
    expect(paletteValueToRgbaString('gray100', 'light')).toBe(`rgba(${light.gray100.join(',')},1)`);
  });

  it('gets the correct rgb value for spectrum alias with opacity in light mode', () => {
    expect(paletteValueToRgbaString(['blue90', 0.33], 'light')).toBe(
      `rgba(${light.blue90.join(',')},${0.33})`,
    );
  });

  it('gets the correct rgb value for spectrum alias in dark mode', () => {
    expect(paletteValueToRgbaString('gray100', 'dark')).toBe(`rgba(${dark.gray100.join(',')},1)`);
  });

  it('gets the correct rgb value for spectrum alias with opacity in dark mode', () => {
    expect(paletteValueToRgbaString(['blue90', 0.33], 'dark')).toBe(
      `rgba(${dark.blue90.join(',')},${0.33})`,
    );
  });
});

describe('paletteAliasToRgbaString', () => {
  it('gets the correct rgb value for spectrum alias in light mode', () => {
    for (const [palette, paletteValue] of Object.entries(defaultPalette)) {
      let expectedRgbaVal = '';
      if (typeof paletteValue !== 'string') {
        const [color, alpha] = paletteValue;
        expectedRgbaVal = `rgba(${light[color as keyof typeof light].join(',')},${[alpha]})`;
      } else {
        expectedRgbaVal = `rgba(${light[paletteValue as keyof typeof light].join(',')},1)`;
      }

      expect(paletteAliasToRgbaString(palette as PaletteAlias, 'light')).toEqual(expectedRgbaVal);
    }
  });

  it('gets the correct rgb value for spectrum alias in dark mode', () => {
    for (const [palette, paletteValue] of Object.entries(defaultPalette)) {
      let expectedRgbaVal = '';
      if (typeof paletteValue !== 'string') {
        const [color, alpha] = paletteValue;
        expectedRgbaVal = `rgba(${dark[color as keyof typeof dark].join(',')},${[alpha]})`;
      } else {
        expectedRgbaVal = `rgba(${dark[paletteValue as keyof typeof dark].join(',')},1)`;
      }

      expect(paletteAliasToRgbaString(palette as PaletteAlias, 'dark')).toEqual(expectedRgbaVal);
    }
  });
});

describe('paletteConfigToRgbaStrings', () => {
  it('returns correct values', () => {
    expect(paletteConfigToRgbaStrings(defaultPalette, 'dark').primary).toBe(
      `rgba(${dark.blue60.join(',')},1)`,
    );
  });
});

describe('paletteValueToRgbaArray', () => {
  it('paletteValueToRgbaArray - returns correct value for light spectrum', () => {
    expect(paletteValueToRgbaArray('blue60', 'light')).toEqual([...spectrumColors.light.blue60, 1]);
  });

  it('paletteValueToRgbaArray - returns correct value for dark spectrum', () => {
    expect(paletteValueToRgbaArray('blue60', 'dark')).toEqual([...spectrumColors.dark.blue60, 1]);
  });
});
