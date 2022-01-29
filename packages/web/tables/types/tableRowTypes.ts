import { MouseEventHandler, MutableRefObject, ReactElement, ReactNode } from 'react';
import { PaletteBackground, PaletteForeground, SharedProps } from '@cbhq/cds-common';

import { TableCellFallbackProps } from './tableCellFallbackTypes';
import { TableCellProps } from './tableCellTypes';

export type TableRowRef = MutableRefObject<HTMLTableRowElement | null>;
export type TableRowProps = {
  /**
   * Children are required, and should always include TableCell | TableCell[].
   * @default undefined
   */
  children: NonNullable<
    | ReactNode
    | ReactNode[]
    | ReactElement<TableCellProps | TableCellFallbackProps>
    | ReactElement<TableCellProps | TableCellFallbackProps[]>
  >;
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
} & SharedProps;
