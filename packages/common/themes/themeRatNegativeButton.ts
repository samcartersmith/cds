/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { mergeThemeConfigs } from '../system/mergeThemeConfigs';
import { ThemeConfig } from '../types';

import { themeBase } from './themeBase';

const palette = { primary: 'red60' } as const;

const config = {
  name: 'ratNegativeButton',
  light: {
    palette,
    rgbaStrings: { primary: 'rgba(207,32,47,1)' },
    hexValues: { primary: '#cf202f' },
    interactableTokens: {
      primary: {
        disabled: {
          contentOpacity: 0.38,
          backgroundColor: 'rgb(237, 170, 176)',
        },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(179, 29, 42)' },
      },
    },
    name: 'ratNegativeButton-light',
  },
  dark: {
    palette,
    rgbaStrings: { primary: 'rgba(240,97,109,1)' },
    hexValues: { primary: '#f0616d' },
    interactableTokens: {
      primary: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(97, 44, 49)' },
        pressed: {
          contentOpacity: 0.86,
          backgroundColor: 'rgb(242, 119, 129)',
        },
      },
    },
    name: 'ratNegativeButton-dark',
  },
} as const;

export const themePartialRatNegativeButton = config;
export const themeRatNegativeButton: ThemeConfig = mergeThemeConfigs(themeBase, config);
