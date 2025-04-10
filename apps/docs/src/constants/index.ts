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
    bgSecondary: `rgb(${defaultTheme.darkSpectrum.gray20})`, // instead of gray15
    bgTertiary: `rgb(${defaultTheme.darkSpectrum.gray5})`, // instead of gray20
    // bgCode: `rgb(${defaultTheme.darkSpectrum.blue0})`, // new color
  },
  fontFamily: {
    display1: 'Arial, Helvetica, Sans-Serif',
    display2: 'Arial, Helvetica, Sans-Serif',
    display3: 'Arial, Helvetica, Sans-Serif',
    title1: 'Arial, Helvetica, Sans-Serif',
    title2: 'Arial, Helvetica, Sans-Serif',
    title3: 'Arial, Helvetica, Sans-Serif',
    title4: 'Arial, Helvetica, Sans-Serif',
    headline: 'Arial, Helvetica, Sans-Serif',
    body: 'Arial, Helvetica, Sans-Serif',
    label1: 'Arial, Helvetica, Sans-Serif',
    label2: 'Arial, Helvetica, Sans-Serif',
    caption: 'Arial, Helvetica, Sans-Serif',
    legal: 'Arial, Helvetica, Sans-Serif',
  },
} as const satisfies ThemeConfig;
