import { PaletteAlias } from '@cbhq/cds-common';
import { defaultPalette } from '@cbhq/cds-common/palette/constants';

import {
  paletteAliasToCssVar,
  paletteConfigToCssVars,
  paletteValueToCssVar,
  setPaletteConfigToCssVars,
} from '../palette';

describe('paletteValueToCssVar', () => {
  it('should handle palette alias conversion', () => {
    expect(paletteValueToCssVar('blue60')).toBe('rgb(var(--blue60))');
  });

  it('should handle palette alias with opacity conversion', () => {
    expect(paletteValueToCssVar(['blue60', 0.2])).toBe('rgba(var(--blue60),0.2)');
  });
});

describe('paletteAliasToCssVar', () => {
  it('gets the correct css var', () => {
    for (const [palette, paletteValue] of Object.entries(defaultPalette)) {
      let expectedCssVar = '';
      if (typeof paletteValue !== 'string') {
        const [color, alpha] = paletteValue;
        expectedCssVar = `rgba(var(--${color}),${alpha})`;
      } else {
        expectedCssVar = `rgb(var(--${paletteValue}))`;
      }

      expect(paletteAliasToCssVar(palette as PaletteAlias)).toEqual(expectedCssVar);
    }
  });
});

describe('paletteConfigToCssVars', () => {
  it('should handle assigning css variables to rgba strings', () => {
    expect(paletteConfigToCssVars(defaultPalette)).toEqual({
      foreground: 'rgb(var(--gray100))',
      foregroundMuted: 'rgb(var(--gray60))',
      background: 'rgb(var(--gray0))',
      backgroundAlternate: 'rgb(var(--gray5))',
      backgroundOverlay: 'rgba(var(--gray80),0.33)',
      line: 'rgba(var(--gray60),0.2)',
      lineHeavy: 'rgba(var(--gray60),0.66)',
      primary: 'rgb(var(--blue60))',
      primaryWash: 'rgb(var(--blue0))',
      primaryForeground: 'rgb(var(--gray0))',
      negative: 'rgb(var(--red60))',
      negativeForeground: 'rgb(var(--gray0))',
      positive: 'rgb(var(--green60))',
      positiveForeground: 'rgb(var(--gray0))',
      secondary: 'rgb(var(--gray0))',
      secondaryForeground: 'rgb(var(--gray100))',
      transparent: 'rgba(var(--gray0),0)',
    });
  });
});

describe('setPaletteConfigToCssVars', () => {
  it('should handle assigning css variables to rgba strings', () => {
    expect(setPaletteConfigToCssVars(defaultPalette)).toEqual({
      '--foreground': 'rgb(var(--gray100))',
      '--foreground-muted': 'rgb(var(--gray60))',
      '--background': 'rgb(var(--gray0))',
      '--background-alternate': 'rgb(var(--gray5))',
      '--background-overlay': 'rgba(var(--gray80),0.33)',
      '--line': 'rgba(var(--gray60),0.2)',
      '--line-heavy': 'rgba(var(--gray60),0.66)',
      '--primary': 'rgb(var(--blue60))',
      '--primary-wash': 'rgb(var(--blue0))',
      '--primary-foreground': 'rgb(var(--gray0))',
      '--negative': 'rgb(var(--red60))',
      '--negative-foreground': 'rgb(var(--gray0))',
      '--positive': 'rgb(var(--green60))',
      '--positive-foreground': 'rgb(var(--gray0))',
      '--secondary': 'rgb(var(--gray0))',
      '--secondary-foreground': 'rgb(var(--gray100))',
      '--transparent': 'rgba(var(--gray0),0)',
    });
  });
});
