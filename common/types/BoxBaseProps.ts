import React from 'react';

import { BorderRadius } from './BorderRadius';
import { DimensionStyles, DimensionValue } from './DimensionStyles';
import { PaletteBackground } from './Palette';
import { OffsetProps, SpacingProps } from './SpacingProps';

export type FlexAxisValue = 'flex-start' | 'flex-end' | 'center';
export type FlexAlignCommon = FlexAxisValue | 'stretch';
export type FlexSpaceCommon = 'space-between' | 'space-around';

export interface FlexStyles {
  /**
   * Set the distribution of space between and around content items along the cross-axis.
   * @default flex-start
   */
  alignContent?: FlexAlignCommon | FlexSpaceCommon;
  /**
   * Set the alignment of all direct children on the cross-axis.
   * @default stretch
   */
  alignItems?: FlexAlignCommon | 'baseline';
  /**
   * Override the parent's defined item alignment for this element alone.
   * @default auto
   */
  alignSelf?: FlexAlignCommon | 'auto' | 'baseline';
  /** Sets the initial main flex size. */
  flexBasis?: number | string;
  /** Order children on the main-axis in this direction. */
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Set the grow factor of this flex item. */
  flexGrow?: number;
  /** Set the shrink factor of this flex item. */
  flexShrink?: number;
  /**
   * How should children wrap when overflowing.
   * @default nowrap
   **/
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  /**
   * Set the distribution of space between and around content items along the main-axis.
   * @default flex-start
   **/
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
  /** Add a border around all sides of the box. */
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
  /**
   * Set the background color of the box. Passing `true` will enable the default background,
   * otherwise a custom palette alias can be passed.
   **/
  background?: true | Exclude<PaletteBackground, 'divider' | 'stroke'>;
  /** Content to render within the box. */
  children?: React.ReactNode;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Leverage one of the borderRadius styles we offer to round the corners of the box. */
  borderRadius?: BorderRadius;
  /** Round the corners of the box with `standard` borderRadius size. */
  rounded?: boolean;
}
