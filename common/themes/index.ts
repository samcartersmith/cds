/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
import base from './theme-base';
import frontier from './theme-frontier';
import elevation1 from './theme-elevation1';
import elevation1Children from './theme-elevation1Children';
import elevation2Children from './theme-elevation2Children';
import elevation2 from './theme-elevation2';
import overlay from './theme-overlay';
import switchControl from './theme-switchControl';
import sparkline from './theme-sparkline';
import ratNegativeButton from './theme-ratNegativeButton';
import ratMarketDetails from './theme-ratMarketDetails';
import { mergeThemeConfigs } from './mergeThemeConfigs';
import { ThemeConfig } from '../types';

export const baseTheme: ThemeConfig = {
  light: base.light,
  dark: { ...base.dark, palette: base.light.palette },
};

export const frontierTheme = mergeThemeConfigs(baseTheme, frontier);
export const elevation1Theme = mergeThemeConfigs(baseTheme, elevation1);
export const elevation1ChildrenTheme = mergeThemeConfigs(baseTheme, elevation1Children);
export const elevation2ChildrenTheme = mergeThemeConfigs(baseTheme, elevation2Children);
export const elevation2Theme = mergeThemeConfigs(baseTheme, elevation2);
export const overlayTheme = mergeThemeConfigs(baseTheme, overlay);
export const switchControlTheme = mergeThemeConfigs(baseTheme, switchControl);
export const sparklineTheme = mergeThemeConfigs(baseTheme, sparkline);
export const ratNegativeButtonTheme = mergeThemeConfigs(baseTheme, ratNegativeButton);
export const ratMarketDetailsTheme = mergeThemeConfigs(baseTheme, ratMarketDetails);
