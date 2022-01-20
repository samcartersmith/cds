import { paletteValueToRgbaString } from '@cbhq/cds-common/palette/paletteValueToRgbaString';
import { Palette } from '../Palette';
import { BuildThemeConfig, buildTheme } from '../theme/buildTheme';

const baseConfig: BuildThemeConfig = {
  palette: Palette.defaultPalette,
};

const frontier: BuildThemeConfig = {
  palette: Palette.frontierSpectrumPalette,
  hasFrontier: true,
};

const switchControl: BuildThemeConfig = {
  palette: Palette.switchPalette,
};

const elevation1: BuildThemeConfig = {
  palette: {
    light: {
      transparent: Palette.defaultPalette.background,
    },
    dark: {
      background: 'gray5',
      transparent: 'gray5',
    },
  },
};

const elevation2: BuildThemeConfig = {
  palette: {
    light: {
      transparent: Palette.defaultPalette.background,
    },
    dark: {
      background: 'gray10',
      transparent: 'gray10',
    },
  },
};

const elevation1Children: BuildThemeConfig = {
  palette: {
    dark: {
      secondary: ['gray5', 0],
    },
  },
};

const elevation2Children: BuildThemeConfig = {
  palette: {
    dark: {
      line: Palette.defaultPalette.lineHeavy,
      secondary: ['gray10', 0],
    },
  },
};

const overlay: BuildThemeConfig = {
  palette: {
    light: {
      backgroundOverlay: ['gray80', 0.33],
    },
    dark: {
      backgroundOverlay: ['gray0', 0.5],
    },
  },
};

const sparkline: BuildThemeConfig = {
  palette: { line: 'gray20' },
};

const ratNegativeButton: BuildThemeConfig = {
  palette: { primary: Palette.defaultPalette.negative },
};

const ratMarketDetails: BuildThemeConfig = {
  palette: {
    background: Palette.defaultPalette.foregroundMuted,
  },
};

export const themeConfigs = {
  base: buildTheme(baseConfig),
  frontier: buildTheme(frontier),
  elevation1: buildTheme(elevation1),
  elevation1Children: buildTheme(elevation1Children),
  elevation2Children: buildTheme(elevation2Children),
  elevation2: buildTheme(elevation2),
  overlay: buildTheme(overlay),
  switchControl: buildTheme(switchControl),
  sparkline: buildTheme(sparkline),
  ratNegativeButton: buildTheme(ratNegativeButton),
  ratMarketDetails: buildTheme(ratMarketDetails),
};

export const fallbackShimmer = {
  light: [
    paletteValueToRgbaString(['gray60', 0.05], 'light'),
    paletteValueToRgbaString(['gray60', 0], 'light'),
    paletteValueToRgbaString(['gray60', 0.1], 'light'),
  ],
  dark: [
    paletteValueToRgbaString(['gray60', 0.05], 'dark'),
    paletteValueToRgbaString(['gray60', 0], 'dark'),
    paletteValueToRgbaString(['gray60', 0.1], 'dark'),
  ],
};
