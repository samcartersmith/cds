/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { ThemeConfig } from '../types';

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { themeBase } from './themeBase';

const palette = { primary: 'red60' } as const;

const config = {
  name: 'ratNegativeButton',
  light: {
    palette,
    rgbaStrings: { primary: 'rgba(207,32,47,1)' },
    hexValues: { primary: '#cf202f' },
    name: 'ratNegativeButton-light',
  },
  dark: {
    palette,
    rgbaStrings: { primary: 'rgba(240,97,109,1)' },
    hexValues: { primary: '#f0616d' },
    name: 'ratNegativeButton-dark',
  },
} as const;

export const themePartialRatNegativeButton = config;
export const themeRatNegativeButton: ThemeConfig = mergeThemeConfigs(themeBase, config);
