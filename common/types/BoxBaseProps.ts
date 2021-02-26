import React from 'react';

import { PaletteBackground } from './Palette';
import { OffsetProps, SpacingProps } from './SpacingProps';

export type FixedValue = number | string; // px
export type PercentageValue = string;
export type DimensionValue = 'auto' | FixedValue | PercentageValue;

export interface DimensionStyles {
  height?: DimensionValue;
  maxHeight?: DimensionValue;
  maxWidth?: DimensionValue;
  minHeight?: DimensionValue;
  minWidth?: DimensionValue;
  width?: DimensionValue;
}

export type FlexAxisValue = 'flex-start' | 'flex-end' | 'center';
export type FlexAlignCommon = FlexAxisValue | 'stretch';
export type FlexSpaceCommon = 'space-between' | 'space-around';

export interface FlexStyles {
  alignContent?: FlexAlignCommon | FlexSpaceCommon;
  alignItems?: FlexAlignCommon | 'baseline';
  alignSelf?: FlexAlignCommon | 'auto' | 'baseline';
  flexBasis?: number | string;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  justifyContent?: FlexAxisValue | FlexSpaceCommon | 'space-evenly';
}

export type PinningDirection = 'top' | 'bottom' | 'left' | 'right' | 'all';

export interface PositionStyles {
  bottom?: DimensionValue;
  left?: DimensionValue;
  position?: 'absolute' | 'relative';
  right?: DimensionValue;
  top?: DimensionValue;
  zIndex?: number;
}

export interface BoxBaseProps
  extends DimensionStyles,
    FlexStyles,
    OffsetProps,
    SpacingProps,
    PositionStyles {
  /** Set the background color of the box. */
  background?: true | Exclude<PaletteBackground, 'divider' | 'stroke'>;
  /** Add a border around the box. */
  bordered?: boolean;
  /** Content to render within the box. */
  children?: React.ReactNode;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Round the corners of the box. */
  rounded?: boolean;
}
