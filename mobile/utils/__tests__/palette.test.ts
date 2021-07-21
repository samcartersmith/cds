import { defaultPalette } from '@cbhq/cds-common/palette/constants';

import { light, dark } from '../../styles/spectrum';
import * as spectrumColors from '../../styles/spectrum';
import {
  paletteValueToRgbaString,
  paletteConfigToRgbaStrings,
  paletteValueToRgbaArray,
} from '../palette';

describe('paletteValueToRgbaString', () => {
  it('gets the correct rgb value for spectrum alias in light mode', () => {
    expect(paletteValueToRgbaString('gray100', 'light')).toEqual(
      `rgba(${light.gray100.join(',')},1)`,
    );
  });

  it('gets the correct rgb value for spectrum alias with opacity in light mode', () => {
    expect(paletteValueToRgbaString(['blue90', 0.33], 'light')).toEqual(
      `rgba(${light.blue90.join(',')},${0.33})`,
    );
  });

  it('gets the correct rgb value for spectrum alias in dark mode', () => {
    expect(paletteValueToRgbaString('gray100', 'dark')).toEqual(
      `rgba(${dark.gray100.join(',')},1)`,
    );
  });

  it('gets the correct rgb value for spectrum alias with opacity in dark mode', () => {
    expect(paletteValueToRgbaString(['blue90', 0.33], 'dark')).toEqual(
      `rgba(${dark.blue90.join(',')},${0.33})`,
    );
  });
});

describe('paletteConfigToRgbaStrings', () => {
  it('returns correct values', () => {
    expect(paletteConfigToRgbaStrings(defaultPalette, 'dark').primary).toEqual(
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
