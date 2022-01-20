/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { ThemeConfig } from '../types';

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { themeBase } from './themeBase';

const config = {
  name: 'elevation1',
  dark: {
    palette: { background: 'gray5' },
    rgbaStrings: { background: 'rgba(20,21,25,1)' },
    hexValues: { background: '#141519' },
    name: 'elevation1-dark',
  },
} as const;

export const themePartialElevation1 = config;
export const themeElevation1: ThemeConfig = mergeThemeConfigs(themeBase, config);
