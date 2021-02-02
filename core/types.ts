// ELEVATION

export type ElevationLevels = 1 | 2;

// SPACING

export const spacingScale = [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type SpacingScale = typeof spacingScale[number] | 0;

// LAYOUT

export type FixedValue = number | string; // px

export type PercentageValue = string;
