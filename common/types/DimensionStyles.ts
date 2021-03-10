export type FixedValue = number | string; // px
export type PercentageValue = string;
export type DimensionValue = 'auto' | FixedValue | PercentageValue;
export type ResizeMode = 'cover' | 'contain';

export interface DimensionStyles {
  /** Set a fixed height. */
  height?: DimensionValue;
  /** Set a maximum height. */
  maxHeight?: DimensionValue;
  /** Set a maximum width. */
  maxWidth?: DimensionValue;
  /** Set a minimum height. */
  minHeight?: DimensionValue;
  /** Set a minimum width. */
  minWidth?: DimensionValue;
  /** Set a fixed width. */
  width?: DimensionValue;
}
