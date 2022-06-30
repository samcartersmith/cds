import { borderRadius } from '../tokens/border';

/** @deprecated Please use BorderRadiusAlpha */
export type BorderRadius = keyof typeof borderRadius;

export type BorderRadiusAlpha = Exclude<
  keyof typeof borderRadius,
  'none' | 'compact' | 'tooltipV2' | 'standard' | 'pill' | 'round' | 'input' | 'search' | 'popover'
>;
