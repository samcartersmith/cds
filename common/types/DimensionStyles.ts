export type FixedValue = number | string; // px
export type PercentageValue = string;
export type DimensionValue = 'auto' | FixedValue | PercentageValue;
export type ResizeMode = 'cover' | 'contain';

export interface DimensionStyles {
  height?: DimensionValue;
  maxHeight?: DimensionValue;
  maxWidth?: DimensionValue;
  minHeight?: DimensionValue;
  minWidth?: DimensionValue;
  width?: DimensionValue;
}
