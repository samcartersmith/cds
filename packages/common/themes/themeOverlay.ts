/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { ThemeConfig } from '../types';

import { themeBase } from './themeBase';

const config = {
  name: 'overlay',
  light: {
    palette: { backgroundOverlay: ['gray80', 0.33] },
    rgbaStrings: { backgroundOverlay: 'rgba(50,53,61,0.33)' },
    hexValues: { backgroundOverlay: '#32353d' },
    interactableTokens: {
      backgroundOverlay: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(177, 178, 181)' },
        pressed: { contentOpacity: 0.84, backgroundColor: 'rgb(83, 85, 92)' },
      },
    },
    name: 'overlay-light',
  },
  dark: {
    palette: { backgroundOverlay: ['gray0', 0.5] },
    rgbaStrings: { backgroundOverlay: 'rgba(10,11,13,0.5)' },
    hexValues: { backgroundOverlay: '#0a0b0d' },
    interactableTokens: {
      backgroundOverlay: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(10, 11, 13)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(30, 31, 32)' },
      },
    },
    name: 'overlay-dark',
  },
} as const;

export const themePartialOverlay = config;
export const themeOverlay: ThemeConfig = mergeThemeConfigs(themeBase, config);
