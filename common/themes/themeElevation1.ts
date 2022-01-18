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
    interactableTokens: {
      background: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(20, 21, 25)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(39, 40, 43)' },
      },
    },
    name: 'elevation1-dark',
  },
} as const;

export const themePartialElevation1 = config;
export const themeElevation1: ThemeConfig = mergeThemeConfigs(themeBase, config);
