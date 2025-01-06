import { ThemeVars } from '../new/vars';

export const accordionSpacing = {
  paddingTop: 2,
  paddingX: 3,
  paddingBottom: 3,
} as const satisfies Record<string, ThemeVars.Space>;

export const accordionMinWidth = 300;
