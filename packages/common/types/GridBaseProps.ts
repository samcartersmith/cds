import React from 'react';

import {
  BorderedStyles,
  BoxBackgroundProps,
  FlexStyles,
  PositionStyles,
  StackBaseProps,
} from './BoxBaseProps';
import { DimensionStyles, DimensionValue } from './DimensionStyles';
import { ElevationProps } from './ElevationLevels';
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
   */
  columns: GridColumn;
  /**
   * Explicitly declare the width of each column per row,
   * @example '100px 20% 1fr 1rem max-content'
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
   */
  templateColumns?: never;
  /**
   * if neither `columns` or `templateColumns` are declared, Grid will implicitly lay out grid lines based on available space
   * You will need to provide a minimum width for each column via `columnMin`
   * @link https://www.w3.org/TR/css-grid-1/#grid-line-concept
   * Grid can take a minimum column dimension that will clamp it to be no less than the value
   */
  columnMin?: never;
  /**
   * if neither `columns` or `templateColumns` are declared, Grid will implicitly lay out grid lines based on available space
   * You can cap the maximum width of each column by passing `columnMax`
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   * Grid can take a maximum column dimension that will clamp it to be no greater than the value
   * @default 1fr
   */
  columnMax?: never;
};

type ExplicitGridColumnStringProps = {
  /**
   * Explicitly declare the number of columns per row
   * columns will divide up the available space within the parent equally
   * @note you can conditionally render different number of columns by breakpoints by passing `columns` to `responsiveConfig`
   */
  columns?: never;
  /**
   * Explicitly declare the width of each column per row,
   * @example '100px 20% 1fr 1rem max-content'
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
   */
  templateColumns: string;
  /**
   * if neither `columns` or `templateColumns` are declared, Grid will implicitly lay out grid lines based on available space
   * You will need to provide a minimum width for each column via `columnMin`
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   * Grid can take a minimum column dimension that will clamp it to be no less than the value
   */
  columnMin?: never;
  /**
   * if neither `columns` or `templateColumns` are declared, Grid will implicitly lay out grid lines based on available space
   * You can cap the maximum width of each column by passing `columnMax`
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   * Grid can take a maximum column dimension that will clamp it to be no greater than the value
   * @default 1fr
   */
  columnMax?: never;
};

type ExplicitGridProps = ExplicitGridColumnStringProps | ExplicitGridColumnProps;

type ImplicitGridProps = {
  /**
   * Explicitly declare the number of columns per row
   * columns will divide up the available space within the parent equally
   * @note you can conditionally render different number of columns by breakpoints by passing `columns` to `responsiveConfig`
   */
  columns?: never;
  /**
   * Explicitly declare the width of each column per row,
   * @example '100px 20% 1fr 1rem max-content'
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
   */
  templateColumns?: never;
  /**
   * if neither `columns` or `templateColumns` are declared, Grid will implicitly lay out grid lines based on available space
   * You will need to provide a minimum width for each column via `columnMin`
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   * @link https://www.w3.org/TR/css-grid-1/#grid-line-concept
   * Grid can take a minimum column dimension that will clamp it to be no less than the value
   */
  columnMin: DimensionValue;
  /**
   * if neither `columns` or `templateColumns` are declared, Grid will implicitly lay out grid lines based on available space
   * You can cap the maximum width of each column by passing `columnMax`
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   * @link https://www.w3.org/TR/css-grid-1/#grid-line-concept
   * Grid can take a maximum column dimension that will clamp it to be no greater than the value
   * @default 1fr
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
  /** Specify props by device breakpoint */
  responsiveConfig?: ResponsiveGridProps;
} & (ExplicitGridProps | ImplicitGridProps) &
  SharedGridProps;

export type ResponsiveGridStyles = Partial<ResponsiveGridColumnProps> &
  Pick<FlexStyles, 'alignItems' | 'alignContent' | 'justifyContent' | 'alignSelf'> &
  OffsetProps &
  SpacingProps &
  StackBaseProps &
  Partial<VisibilityProps>;

export type ResponsiveGridProps = Partial<Record<ResponsivePropsDevices, ResponsiveGridStyles>>;
