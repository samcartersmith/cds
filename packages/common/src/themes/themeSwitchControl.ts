/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { ThemeConfig } from '../types';

import { themeBase } from './themeBase';

const palette = { backgroundAlternate: 'gray20' } as const;

const config = {
  name: 'switchControl',
  light: {
    palette,
    rgbaStrings: { backgroundAlternate: 'rgba(191,196,207,1)' },
    hexValues: { backgroundAlternate: '#bfc4cf' },
    name: 'switchControl-light',
  },
  dark: {
    palette,
    rgbaStrings: { backgroundAlternate: 'rgba(50,53,61,1)' },
    hexValues: { backgroundAlternate: '#32353d' },
    name: 'switchControl-dark',
  },
} as const;

export const themePartialSwitchControl = config;
export const themeSwitchControl: ThemeConfig = mergeThemeConfigs(themeBase, config);
