import { ThemeConfig } from '@cbhq/cds-web2/core/theme';
import { defaultTheme } from '@cbhq/cds-web2/themes/defaultTheme';

export const DESKTOP_BREAKPOINT = 1280;

export const docsTheme = {
  ...defaultTheme,
  lightColor: {
    ...defaultTheme.lightColor,
    bgAlternate: `rgb(${defaultTheme.lightSpectrum.gray5})`, // instead of gray10
    bgTertiary: `rgb(${defaultTheme.lightSpectrum.gray15})`, // instead of gray20
  },
  darkColor: {
    ...defaultTheme.darkColor,
    bg: `rgb(${defaultTheme.darkSpectrum.gray10})`, // instead of gray0
    bgSecondary: `rgb(${defaultTheme.darkSpectrum.gray20})`, // instead of gray15
    bgTertiary: `rgb(${defaultTheme.darkSpectrum.gray5})`, // instead of gray20
  },
} as const satisfies ThemeConfig;
