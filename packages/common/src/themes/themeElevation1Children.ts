/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { ThemeConfig } from '../types';

import { themeBase } from './themeBase';

const config = {
  name: 'elevation1Children',
  dark: {
    palette: { secondary: ['gray5', 0] },
    rgbaStrings: { secondary: 'rgba(20,21,25,0)' },
    hexValues: { secondary: '#000000' },
    name: 'elevation1Children-dark',
  },
} as const;

export const themePartialElevation1Children = config;
export const themeElevation1Children: ThemeConfig = mergeThemeConfigs(themeBase, config);
