/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { ThemeConfig } from '../types';

import { themeBase } from './themeBase';

const palette = { background: 'gray60' } as const;

const config = {
  name: 'ratMarketDetails',
  light: {
    palette,
    rgbaStrings: { background: 'rgba(91,97,110,1)' },
    hexValues: { background: '#5b616e' },
    interactableTokens: {
      background: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(91, 97, 110)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(80, 85, 96)' },
      },
    },
    name: 'ratMarketDetails-light',
  },
  dark: {
    palette,
    rgbaStrings: { background: 'rgba(138,145,158,1)' },
    hexValues: { background: '#8a919e' },
    interactableTokens: {
      background: {
        disabled: {
          contentOpacity: 0.38,
          backgroundColor: 'rgb(138, 145, 158)',
        },
        pressed: {
          contentOpacity: 0.86,
          backgroundColor: 'rgb(154, 160, 172)',
        },
      },
    },
    name: 'ratMarketDetails-dark',
  },
} as const;

export const themePartialRatMarketDetails = config;
export const themeRatMarketDetails: ThemeConfig = mergeThemeConfigs(themeBase, config);
