/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { ThemeConfig } from '../types';

import { themeBase } from './themeBase';

const palette = { line: 'gray20' } as const;

const config = {
  name: 'sparkline',
  light: {
    palette,
    rgbaStrings: { line: 'rgba(191,196,207,1)' },
    hexValues: { line: '#bfc4cf' },
    name: 'sparkline-light',
  },
  dark: {
    palette,
    rgbaStrings: { line: 'rgba(50,53,61,1)' },
    hexValues: { line: '#32353d' },
    name: 'sparkline-dark',
  },
} as const;

export const themePartialSparkline = config;
export const themeSparkline: ThemeConfig = mergeThemeConfigs(themeBase, config);
