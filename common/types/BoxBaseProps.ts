import React from 'react';

import { DimensionStyles, DimensionValue } from './DimensionStyles';
import { PaletteBackground } from './Palette';
import { OffsetProps, SpacingProps } from './SpacingProps';

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
  /** Position the box to the bottom edge. */
  bottom?: DimensionValue;
  /** Position the box to the left edge. */
  left?: DimensionValue;
  /** How to position the box within its parent. */
  position?: 'absolute' | 'relative';
  /** Position the box to the right edge. */
  right?: DimensionValue;
  /** Position the box to the top edge. */
  top?: DimensionValue;
  /** Adjust the z-index positioning layer. */
  zIndex?: number;
}

export interface BorderedStyles {
  /** Add a border around the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
}

export interface BoxBaseProps
  extends DimensionStyles,
    FlexStyles,
    OffsetProps,
    SpacingProps,
    PositionStyles,
    BorderedStyles {
  /** Set the background color of the box. */
  background?: true | Exclude<PaletteBackground, 'divider' | 'stroke'>;
  /** Content to render within the box. */
  children?: React.ReactNode;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Round the corners of the box. */
  rounded?: boolean;
}
