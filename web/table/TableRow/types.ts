import { ReactElement } from 'react';
import { PaletteBackground, PaletteForeground } from '@cbhq/cds-common';

export type TableRowProps = {
  /**
   * Children are required, and should always include TableCell | TableCell[].
   * @default undefined
   */
  children: ReactElement<unknown> | ReactElement<unknown>[]; // Use ReactElement<TableCellProps> | ReactElement<TAbleCellProps>[] when they are avialable
  /**
   * Linaria flavored className.
   * @default undefined
   */
  className?: string;
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
   * When set, we'll set a hover bacgkround color
   * of palette.backgroundAlternate for the row.
   * @default false
   */
  indicateHover?: boolean;
};
