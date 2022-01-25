/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { ThemeConfig } from '../types';

import { themeBase } from './themeBase';

const config = {
  name: 'frontier',
  light: {
    palette: { secondary: 'gray5' },
    rgbaStrings: { secondary: 'rgba(238,240,243,1)' },
    hexValues: { secondary: '#eef0f3' },
    name: 'frontier-light',
  },
  dark: {
    palette: { secondary: 'gray20' },
    rgbaStrings: { secondary: 'rgba(50,53,61,1)' },
    hexValues: { secondary: '#32353d' },
    name: 'frontier-dark',
  },
} as const;

export const themePartialFrontier = config;
export const themeFrontier: ThemeConfig = mergeThemeConfigs(themeBase, config);
