/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { ThemeConfig } from '../types';

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { themeBase } from './themeBase';

const config = {
  name: 'elevation1',
  light: {
    palette: { transparent: 'gray0' },
    rgbaStrings: { transparent: 'rgba(255,255,255,1)' },
    hexValues: { transparent: '#ffffff' },
    name: 'elevation1-light',
  },
  dark: {
    palette: { background: 'gray5', transparent: 'gray5' },
    rgbaStrings: { background: 'rgba(20,21,25,1)', transparent: 'rgba(20,21,25,1)' },
    hexValues: { background: '#141519', transparent: '#141519' },
    name: 'elevation1-dark',
  },
} as const;

export const themePartialElevation1 = config;
export const themeElevation1: ThemeConfig = mergeThemeConfigs(themeBase, config);
