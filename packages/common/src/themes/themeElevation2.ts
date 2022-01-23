/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { ThemeConfig } from '../types';

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { themeBase } from './themeBase';

const config = {
  name: 'elevation2',
  dark: {
    palette: { background: 'gray10' },
    rgbaStrings: { background: 'rgba(30,32,37,1)' },
    hexValues: { background: '#1e2025' },
    name: 'elevation2-dark',
  },
} as const;

export const themePartialElevation2 = config;
export const themeElevation2: ThemeConfig = mergeThemeConfigs(themeBase, config);
