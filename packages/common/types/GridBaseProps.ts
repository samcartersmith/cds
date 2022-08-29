import React from 'react';

import {
  BorderedStyles,
  BoxBackgroundProps,
  FlexStyles,
  PositionStyles,
  StackBaseProps,
} from './BoxBaseProps';
import { DimensionStyles, DimensionValue } from './DimensionStyles';
import { ElevationLevels } from './ElevationLevels';
import { GridColumn } from './Grid';
import { ResponsivePropsDevices } from './Responsive';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';
import { OffsetProps, SpacingProps } from './SpacingProps';
import { Visibility } from './Visibility';

type ExplicitGridProps = {
  /**
   * Explicitly declare the number of columns per row as either a number of columns of equal size
   * or as a string and declare the width of each column per row, eg: '100px 20% 1fr 1rem max-content'
   * Note: `responsiveConfig` only supports columns as a number
   */
  columns: GridColumn | string;
  /**
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   * Grid can take a minimum column dimension that will clamp it to be no less than the value
   */
  columnMin?: never;
  /**
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   * Grid can take a maximum column dimension that will clamp it to be no greater than the value
   * @default 1fr
   */
  columnMax?: never;
};

type ImplicitGridProps = {
  /**
   * Explicitly declare the number of columns per row as either a number of columns of equal size
   * or as a string and declare the width of each column per row, eg: '100px 20% 1fr 1rem max-content'
   * Note: `responsiveConfig` only supports columns as a number
   */
  columns?: never;
  /**
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   * Grid can take a minimum column dimension that will clamp it to be no less than the value
   */
  columnMin: DimensionValue;
  /**
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   * Grid can take a maximum column dimension that will clamp it to be no greater than the value
   * @default 1fr
   */
  columnMax?: DimensionValue;
};

type ResponsiveGridColumnProps = {
  /**
   * Explicitly declare the number of columns per row as a number of columns of equal size
   */
  columns?: GridColumn;
};

type VisibilityProps = {
  visibility?: Visibility;
};

export type GridBaseProps = {
  /** Content to render within a Grid. */
  children?: React.ReactNode;
  /** Determines Grid shadow styles. Parent should have overflow set to visible to ensure styles are not clipped. */
  elevation?: ElevationLevels;
  /** Specify props by device breakpoint */
  responsiveConfig?: ResponsiveGridProps;
} & (ExplicitGridProps | ImplicitGridProps) &
  Pick<FlexStyles, 'alignItems' | 'alignContent' | 'justifyContent' | 'alignSelf'> &
  BorderedStyles &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityLabelledBy' | 'id'> &
  BoxBackgroundProps &
  OffsetProps &
  SpacingProps &
  StackBaseProps &
  SharedProps &
  DimensionStyles &
  Pick<PositionStyles, 'zIndex'> &
  VisibilityProps;

export type ResponsiveGridStyles = Partial<ResponsiveGridColumnProps> &
  Pick<FlexStyles, 'alignItems' | 'alignContent' | 'justifyContent' | 'alignSelf'> &
  OffsetProps &
  SpacingProps &
  StackBaseProps &
  VisibilityProps;

export type ResponsiveGridProps = Partial<Record<ResponsivePropsDevices, ResponsiveGridStyles>>;
