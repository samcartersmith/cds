import { ThemeConfig } from '@cbhq/cds-web2/core/theme';
import { defaultTheme } from '@cbhq/cds-web2/themes/defaultTheme';

export const DESKTOP_BREAKPOINT = 1280;

export const docsTheme = {
  ...defaultTheme,
  light: {
    ...defaultTheme.light,
    bgAlternate: `rgb(${defaultTheme.lightSpectrum.gray5})`, // instead of gray10
    bgTertiary: `rgb(${defaultTheme.lightSpectrum.gray15})`, // instead of gray20
    // bgCode: `rgb(${defaultTheme.lightSpectrum.blue0})`, // new color
  },
  dark: {
    ...defaultTheme.dark,
    bg: `rgb(${defaultTheme.darkSpectrum.gray10})`, // instead of gray0
    bgSecondary: `rgb(${defaultTheme.darkSpectrum.gray15})`, // instead of gray15
    bgTertiary: `rgb(${defaultTheme.darkSpectrum.gray10})`, // instead of gray20
    // bgCode: `rgb(${defaultTheme.darkSpectrum.blue0})`, // new color
  },
} as const satisfies ThemeConfig;
