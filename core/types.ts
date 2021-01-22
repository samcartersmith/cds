// ELEVATION

export type ElevationLevels = 1 | 2;

// SPACING

export type NegativeSpacingScale = -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | -0.5 | 0;

export type PositiveSpacingScale = 0 | 0.5 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type SpacingScale = NegativeSpacingScale | PositiveSpacingScale;

// LAYOUT

export type FixedValue = number | string; // px

export type PercentageValue = string;
