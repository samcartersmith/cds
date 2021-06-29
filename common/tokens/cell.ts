import { ScaleDensity } from '../types/Scale';

export const mediaSize: Record<ScaleDensity, number> = {
  dense: 24,
  normal: 32,
};

// Height of the inner cell without padding
export const imageSize: Record<ScaleDensity, number> = {
  dense: 40,
  normal: 48,
};

export const listHeight: Record<ScaleDensity, number> = {
  dense: 64,
  normal: 80,
};
