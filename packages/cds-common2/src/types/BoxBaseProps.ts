import { ThemeVars } from '../core/theme';

import { DimensionStyles, DimensionValue } from './DimensionStyles';
import { ElevationLevels } from './ElevationLevels';
import { Position } from './Position';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { MarginProps, PaddingProps } from './SpacingProps';
import { Visibility } from './Visibility';

export type FlexShrink = { flexShrink?: number };
export type FlexGrow = { flexGrow?: number };

export type FlexStyles = {
  /**
   * Set the distribution of space between and around content items along the cross-axis.
   * @default flex-start
   */
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /**
   * Set the alignment of all direct children on the cross-axis.
   * @default stretch
   */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /**
   * Override the parent's defined item alignment for this element alone.
   * @default auto
   */
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'auto' | 'baseline';
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
   */
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  /**
   * Set the distribution of space between and around content items along the main-axis.
   * @default flex-start
   */
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
};

export type PinningDirection = 'top' | 'bottom' | 'left' | 'right' | 'all';

export type PositionStyles = {
  /** Position the box to the bottom edge. */
  bottom?: DimensionValue;
  /** Position the box to the left edge. */
  left?: DimensionValue;
  /** How to position the box within its parent. */
  position?: Position;
  /** Position the box to the right edge. */
  right?: DimensionValue;
  /** Position the box to the top edge. */
  top?: DimensionValue;
  /** Adjust the z-index positioning layer. */
  zIndex?: number;
};

export type BorderedStyles = {
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
  /** Leverage one of the borderRadius styles we offer to round the corners of the box. */
  borderRadius?: ThemeVars.BorderRadius;
  /** Adds a custom border color from the palette */
  borderColor?: ThemeVars.Color;
};

export type BoxA11yProps = Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy'
> & {
  /** @danger This should only be used for accessibility purposes, eg: aria-controls https://accessibilityresources.org/aria-controls */
  id?: string;
};

export type BoxBackgroundProps = {
  /**
   * Set the background color of the box. Passing `true` will enable the default background,
   * otherwise a custom palette alias can be passed.
   */
  background?: ThemeVars.Color;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
};

type VisibilityProps = {
  visibility?: Visibility;
};

export type BoxBaseProps = {
  /** Content to render within the box. */
  children?: React.ReactNode;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Determines box shadow styles. Parent should have overflow set to visible to ensure styles are not clipped. */
  elevation?: ElevationLevels;
} & DimensionStyles &
  FlexStyles &
  PaddingProps &
  MarginProps &
  PositionStyles &
  BorderedStyles &
  BoxA11yProps &
  BoxBackgroundProps &
  VisibilityProps;

export type StackBaseProps = {
  /** Gap to insert between siblings. */
  gap?: ThemeVars.Space;
};
