import { MouseEventHandler, MutableRefObject, ReactNode } from 'react';
import {
  PaletteBackground,
  PaletteForeground,
  ResponsiveCellSpacingProps,
  SharedProps,
} from '@cbhq/cds-common';

import { TableCellProps } from './tableCellTypes';

export type TableRowRef = MutableRefObject<HTMLTableRowElement | null>;
export type TableRowProps = {
  /**
   * Children are required, and should always include TableCell | TableCell[].
   * @default undefined
   */
  children: NonNullable<ReactNode>;
  /**
   * Should this row span the entire width of the table?
   * Useful for treating a row as a Control Strip.
   * @default undefined
   */
  fullWidth?: boolean;
  /**
   * Set the background color for this entire row
   * to some CDS Palette background color name
   * @default undefined
   */
  backgroundColor?: PaletteBackground;
  /**
   * Set the text color for this entire row to some
   * CDS Palette foreground color name
   * @default undefined
   */
  color?: PaletteForeground;
  /**
   * When set, we'll set a hover background color
   * of palette.backgroundAlternate for the row.
   * @default false
   */
  disableHoverIndicator?: boolean;
  /**
   * Callback to fire when pressed
   * @default noop
   */
  onPress?: MouseEventHandler<Element> | (() => void);
  /**
   * The spacing to use on the parent wrapper of Cell.
   * Will only take effect when fullWidth is set to true
   */
  outerSpacing?: TableCellProps['innerSpacing'];
  /**
   * The spacing to use on the inner content of Cell.
   * Will only take effect when fullWidth is set to true
   */
  innerSpacing?: TableCellProps['innerSpacing'];
  /**
   * Specify props by device breakpoint
   *  Can only be used when TableRow is fullWidth
   */
  responsiveConfig?: ResponsiveCellSpacingProps;
} & SharedProps;
