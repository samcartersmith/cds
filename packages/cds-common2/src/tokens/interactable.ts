import { ThemeVars } from '../core/theme';

export const opacityHovered: Record<ThemeVars.SpectrumHueStep, number> = {
  0: 0.98,
  5: 0.98,
  10: 0.97,
  15: 0.97,
  20: 0.96,
  30: 0.95,
  40: 0.94,
  50: 0.93,
  60: 0.92,
  70: 0.91,
  80: 0.9,
  90: 0.89,
  100: 0.88,
} as const;

export const opacityPressed: Record<ThemeVars.SpectrumHueStep, number> = {
  0: 0.92,
  5: 0.92,
  10: 0.91,
  15: 0.91,
  20: 0.9,
  30: 0.89,
  40: 0.88,
  50: 0.87,
  60: 0.86,
  70: 0.85,
  80: 0.84,
  90: 0.83,
  100: 0.82,
} as const;

export const accessibleOpacityDisabled = 0.5;
