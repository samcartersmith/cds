/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { ThemeConfig } from '../types';

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { themeBase } from './themeBase';

const palette = { background: 'gray60' } as const;

const config = {
  name: 'ratMarketDetails',
  light: {
    palette,
    rgbaStrings: { background: 'rgba(91,97,110,1)' },
    hexValues: { background: '#5b616e' },
    name: 'ratMarketDetails-light',
  },
  dark: {
    palette,
    rgbaStrings: { background: 'rgba(138,145,158,1)' },
    hexValues: { background: '#8a919e' },
    name: 'ratMarketDetails-dark',
  },
} as const;

export const themePartialRatMarketDetails = config;
export const themeRatMarketDetails: ThemeConfig = mergeThemeConfigs(themeBase, config);
