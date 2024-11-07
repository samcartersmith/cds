import { MergeExclusive } from 'type-fest';

import { FlexStyles, StackBaseProps } from './BoxBaseProps';
import { GridColumn } from './Grid';
import { SharedGridProps } from './GridBaseProps';
import { ResponsivePropsDevices } from './Responsive';
import { OffsetProps, SpacingProps } from './SpacingProps';

/** Grid columns are 1 indexed and the last column is referenced by -1 */
type GridColumnSpan = GridColumn | -1;

type GridColumnProps = {
  /**
   * Specify the GridColumn's size and location
   * Shorthand for colStart and colEnd which specify which grid lines the GridColumn will span
   * @link https://www.w3.org/TR/css-grid-1/#grid-line-concept
   * eg: you have a 3 column grid and you want a GridColumn to span the entire row
   * you could use gridColumn: 1 / 4
   * or gridColumn: 1 / span 3
   * or gridColumn: 1 / -1 where -1 is always the last grid line in the row
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
   * @note you cannot use `gridColumn` with `colSpan`, `colStart`, or `colEnd`
   */
  gridColumn?: `${GridColumn} / ${GridColumnSpan}` | `${GridColumn} / span ${GridColumnSpan}`;
};

type GridColumnSpanProps = {
  /**
   * Number of grid lines you want the GridColumn to span
   * @link https://www.w3.org/TR/css-grid-1/#grid-line-concept
   * You should also provide a `colStart`, otherwise it will default to 'auto' placement
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
   * @note you cannot use `colSpan` with the `gridColumn` shorthand prop
   */
  colSpan?: GridColumn;
  /**
   * @default 'auto' (automatically placed with a span of 1)
   * @description Grid columns are 1 indexed
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
   * @note you cannot use `colStart` with the `gridColumn` shorthand prop
   */
  colStart?: GridColumn | 'auto';
  /**
   * @default 'auto' (span 1, eg: the next grid line over from colStart)
   * @description Grid columns are 1 indexed
   * That means the end of the row will be the number of columns + 1
   * eg: you have a 3 column grid and you want a GridColumn to span the entire row
   * you could use colStart: 1 and colEnd: 4
   * or alternatively, colStart: 1 and colEnd: -1 which will span all columns in a row
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end
   * @note you cannot use `colEnd` with the `gridColumn` shorthand prop
   */
  colEnd?: GridColumn | -1 | 'auto';
};

export type ResponsiveColumnStyles = Partial<
  GridColumnSpanProps &
    Pick<FlexStyles, 'alignItems' | 'alignContent' | 'justifyContent' | 'alignSelf'> &
    OffsetProps &
    SpacingProps &
    StackBaseProps
>;

export type ResponsiveColumnProps = Partial<Record<ResponsivePropsDevices, ResponsiveColumnStyles>>;

export type GridColumnBaseProps = {
  /** Content to render within a Grid. */
  children?: React.ReactNode;
  /** Specify props by device breakpoint */
  responsiveConfig?: ResponsiveColumnProps;
} & SharedGridProps &
  MergeExclusive<GridColumnSpanProps, GridColumnProps>;
