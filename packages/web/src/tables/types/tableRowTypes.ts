import {
  PaletteBackground,
  PaletteForeground,
  ResponsiveCellSpacingProps,
  SharedProps,
} from '@cbhq/cds-common';

import { TableCellProps } from './tableCellTypes';

export type TableRowRef = React.MutableRefObject<HTMLTableRowElement | null>;
export type TableRowProps = {
  /**
   * Children are required, and should always include TableCell | TableCell[].
   */
  children: NonNullable<React.ReactNode>;
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
   * By default, we set a hover background color of
   * palette.backgroundAlternate on hover for the row.
   * Use this prop to disable this behavior
   * @default false
   */
  disableHoverIndicator?: boolean;
  /**
   * Callback to fire when pressed
   * @default noop
   */
  onPress?: React.MouseEventHandler<Element> | (() => void);
  /**
   * The spacing to use on the parent wrapper of Cell.
   * Will only take effect when fullWidth is set to true
   */
  outerSpacing?: TableCellProps['outerSpacing'];
  /**
   * The spacing to use on the inner content of Cell.
   * Will only take effect when fullWidth is set to true
   */
  innerSpacing?: TableCellProps['innerSpacing'];
  /**
   * Specify props by device breakpoint.
   * Can only be used when TableRow is fullWidth
   */
  responsiveConfig?: ResponsiveCellSpacingProps;
} & SharedProps &
  Omit<React.HTMLAttributes<HTMLTableRowElement>, 'dangerouslySetInnerHTML'>;
