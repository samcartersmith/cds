/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { ThemeConfig } from '../types';

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { themeBase } from './themeBase';

const config = {
  name: 'overlay',
  light: {
    palette: { backgroundOverlay: ['gray80', 0.33] },
    rgbaStrings: { backgroundOverlay: 'rgba(50,53,61,0.33)' },
    hexValues: { backgroundOverlay: '#32353d' },
    name: 'overlay-light',
  },
  dark: {
    palette: { backgroundOverlay: ['gray0', 0.5] },
    rgbaStrings: { backgroundOverlay: 'rgba(10,11,13,0.5)' },
    hexValues: { backgroundOverlay: '#0a0b0d' },
    name: 'overlay-dark',
  },
} as const;

export const themePartialOverlay = config;
export const themeOverlay: ThemeConfig = mergeThemeConfigs(themeBase, config);
