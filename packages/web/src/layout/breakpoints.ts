/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

export const deviceBreakpoints = {
  phone: 360,
  phoneLandscape: 560,
  tablet: 768,
  tabletLandscape: 1024,
  desktop: 1280,
  desktopLarge: 1440,
  extraWide: 1600,
} as const;

export const deviceMqs = {
  phone: 'max-width: 559px',
  phoneLandscape: 'max-width: 767px',
  tablet: 'max-width: 1023px',
  tabletLandscape: 'max-width: 1279px',
  desktop: 'min-width: 1280px',
  desktopLarge: 'min-width: 1440px',
  extraWide: 'min-width: 1600px',
} as const;

export const deviceMqRanges = {
  phone: '(max-width: 559px)',
  phoneLandscape: '(min-width: 560px) and (max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1279px)',
  tabletLandscape: '(min-width: 1024px) and (max-width: 1279px)',
  desktop: '(min-width: 1280px)',
  desktopLarge: '(min-width: 1440px)',
  extraWide: '(min-width: 1600px)',
} as const;
