/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { ThemeConfig } from '../types';

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { themeBase } from './themeBase';

const config = {
  name: 'elevation1Children',
  dark: {
    palette: { secondary: ['gray5', 0] },
    rgbaStrings: { secondary: 'rgba(20,21,25,0)' },
    hexValues: { secondary: '#000000' },
    interactableTokens: {
      secondary: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(14, 15, 18)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(39, 40, 43)' },
      },
    },
    name: 'elevation1Children-dark',
  },
} as const;

export const themePartialElevation1Children = config;
export const themeElevation1Children: ThemeConfig = mergeThemeConfigs(themeBase, config);
