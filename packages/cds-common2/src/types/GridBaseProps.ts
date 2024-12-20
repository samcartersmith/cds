import React from 'react';
import { MergeExclusive } from 'type-fest';

import {
  BorderedStyles,
  BoxBackgroundProps,
  FlexStyles,
  PositionStyles,
  StackBaseProps,
} from './BoxBaseProps';
import { DimensionStyles, DimensionValue } from './DimensionStyles';
import { ElevationLevels, ElevationProps } from './ElevationLevels';
import { GridColumn } from './Grid';
import { ResponsivePropsDevices } from './Responsive';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';
import { OffsetProps, SpacingProps } from './SpacingProps';
import { VisibilityProps } from './Visibility';

type ExplicitGridColumnProps = {
  /**
   * Explicitly declare the number of columns per row
   * columns will divide up the available space within the parent equally
   * @note you can conditionally render different number of columns by breakpoints by passing `columns` to `responsiveConfig`
   * @note `columns` cannot be used in conjunction with `templateColumns` or `columnMin` or `columnMax`
   */
  columns?: GridColumn;
};

type ExplicitGridColumnStringProps = {
  /**
   * Explicitly declare the width of each column per row,
   * @example '100px 20% 1fr 1rem max-content'
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
   * @note `templateColumns` cannot be used in conjunction with `columns` or `columnMin` or `columnMax`
   */
  templateColumns?: string;
};

type ExplicitGridProps = MergeExclusive<ExplicitGridColumnStringProps, ExplicitGridColumnProps>;

type ImplicitGridProps = {
  /**
   * if neither `columns` or `templateColumns` are declared, Grid will implicitly lay out tracks based on available space
   * You will need to provide a minimum width for each column via `columnMin`
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   * @link https://www.w3.org/TR/css-grid-1/#grid-line-concept
   * Grid can take a minimum column dimension that will clamp it to be no less than the value
   * @note `columnMin` cannot be used in conjunction with `columns` or `templateColumns`
   */
  columnMin?: DimensionValue;
  /**
   * if neither `columns` or `templateColumns` are declared, Grid will implicitly lay out grid lines based on available space
   * You can cap the maximum width of each column by passing `columnMax`
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   * @link https://www.w3.org/TR/css-grid-1/#grid-line-concept
   * Grid can take a maximum column dimension that will clamp it to be no greater than the value
   * @default 1fr
   * @note `columnMax` cannot be used in conjunction with `columns` or `templateColumns`
   */
  columnMax?: DimensionValue;
};

type ResponsiveGridColumnProps = {
  /**
   * Explicitly declare the number of columns per row
   * columns will divide up the available space within the parent equally
   * @note you can conditionally render different number of columns by breakpoints by passing `columns` to `responsiveConfig`
   */
  columns?: GridColumn;
};

export type SharedGridProps = Pick<
  FlexStyles,
  'alignItems' | 'alignContent' | 'justifyContent' | 'alignSelf'
> &
  BorderedStyles &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityLabelledBy' | 'id'> &
  BoxBackgroundProps &
  OffsetProps &
  SpacingProps &
  StackBaseProps &
  SharedProps &
  DimensionStyles &
  Pick<PositionStyles, 'zIndex'> &
  Partial<VisibilityProps> &
  ElevationProps;

export type GridBaseProps = {
  /** Content to render within a Grid. */
  children?: React.ReactNode;
  /** Determines Grid shadow styles. Parent should have overflow set to visible to ensure styles are not clipped. */
  elevation?: ElevationLevels;
  /** Specify props by device breakpoint */
  responsiveConfig?: ResponsiveGridProps;
} & SharedGridProps &
  MergeExclusive<ExplicitGridProps, ImplicitGridProps>;

export type ResponsiveGridStyles = Partial<ResponsiveGridColumnProps> &
  Pick<FlexStyles, 'alignItems' | 'alignContent' | 'justifyContent' | 'alignSelf'> &
  OffsetProps &
  SpacingProps &
  StackBaseProps &
  Partial<VisibilityProps>;

export type ResponsiveGridProps = Partial<Record<ResponsivePropsDevices, ResponsiveGridStyles>>;
