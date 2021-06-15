import { defaultPalette } from '../palette/constants';
import type { ElevationLevels, PartialPaletteConfig, SpectrumAlias } from '../types';

type ElevationPalette = Record<ElevationLevels, { background: SpectrumAlias }>;
type ElevationChildrenPalette = Record<ElevationLevels, PartialPaletteConfig>;

type ElevationToken = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
};

/** Dark mode palette overrides for an elevated surface */
export const elevationPalette: ElevationPalette = {
  1: {
    background: 'gray5',
  },
  2: {
    background: 'gray10',
  },
};

/** Dark mode palette overrides for the children of an elevated surface */
/** secondary - Match elevated surface background so pressable cards with secondary buttons appear as a single surface. */
/** line - Increase brightness of lines in level2 so they appear closer to light source. */
export const elevationChildrenPalette: ElevationChildrenPalette = {
  1: {
    secondary: [elevationPalette[1].background, 0],
  },
  2: {
    line: defaultPalette.lineHeavy,
    secondary: [elevationPalette[2].background, 0],
  },
};

const sharedStyles = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 8 },
};

export const elevation: Record<ElevationLevels, ElevationToken> = {
  1: {
    ...sharedStyles,
    shadowOpacity: 0.02,
    shadowRadius: 12,
  },
  2: {
    ...sharedStyles,
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
};
