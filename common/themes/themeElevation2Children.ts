/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { ThemeConfig } from '../types';

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { themeBase } from './themeBase';

const config = {
  name: 'elevation2Children',
  dark: {
    palette: { line: ['gray60', 0.66], secondary: ['gray10', 0] },
    rgbaStrings: { line: 'rgba(138,145,158,0.66)', secondary: 'rgba(30,32,37,0)' },
    hexValues: { line: '#8a919e', secondary: '#000000' },
    interactableTokens: {
      line: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(59, 62, 68)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(154, 160, 172)' },
      },
      secondary: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(18, 19, 22)' },
        pressed: { contentOpacity: 0.91, backgroundColor: 'rgb(50, 52, 57)' },
      },
    },
    name: 'elevation2Children-dark',
  },
} as const;

export const themePartialElevation2Children = config;
export const themeElevation2Children: ThemeConfig = mergeThemeConfigs(themeBase, config);
