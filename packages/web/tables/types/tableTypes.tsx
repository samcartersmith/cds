import { ReactNode } from 'react';
import { CellSpacing, SharedProps } from '@cbhq/cds-common';

/**
 * The table variant will be provided via context and available
 * to any internal Table component (TableBody, TableCell, etc)
 * @default undefined
 */
export type TableVariant = 'default' | 'graph' | 'ruled';
export type TableLayout = 'auto' | 'fixed';
export type TableCellSpacing = {
  inner?: CellSpacing;
  outer?: CellSpacing;
};

export type TableCtx = {
  variant?: TableVariant;
  cellSpacing?: TableCellSpacing;
};

export type TableProps = {
  /**
   * The variant prop allows clients to use a
   * CDS approved style for their Table.
   * @default undefined
   */
  variant?: TableVariant;
  /**
   * Children are required, and should always include a TableBody.
   * TableHeader and TableFooter are both optional, and will magically
   * flow into the correct place in the table (top/bottom)
   */
  children: ReactNode;
  /**
   * When provided, we'll apply a bordered around the entire table
   */
  bordered?: boolean;
  /**
   * Use tableLayout='fixed' if you need full control over cell width
   * @default 'auto'
   */
  tableLayout?: TableLayout;
  /** Provide custom cell spacing for all child TableCells */
  cellSpacing?: TableCellSpacing;
} & SharedProps;
