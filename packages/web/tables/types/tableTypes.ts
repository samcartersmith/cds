import { ReactNode } from 'react';
import {
  CellSpacing,
  DimensionValue,
  SharedAccessibilityProps,
  SharedProps,
} from '@cbhq/cds-common';

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

export type TableCtx = Pick<TableProps, 'variant' | 'cellSpacing' | 'compact'>;

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
   * When set, a border will be applied around the entire table
   */
  bordered?: boolean;
  /**
   * Use tableLayout='fixed' if you need full control over cell width
   * @default 'auto'
   */
  tableLayout?: TableLayout;
  /** Provide custom cell spacing for all child TableCells */
  cellSpacing?: TableCellSpacing;
  /** Use compact cell spacing. If set, cellSpacing will override these defaults */
  compact?: boolean;
  /** Set a fixed height. */
  height?: DimensionValue;
  /** Set a maximum height. */
  maxHeight?: DimensionValue;
  /**
   * @danger This is an escape hatch. It is not intended to be used normally.
   */
  dangerouslySetClassName?: string;
} & SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabelledBy' | 'accessibilityLabel'> &
  Omit<React.HTMLAttributes<HTMLTableElement>, 'dangerouslySetInnerHTML'>;
