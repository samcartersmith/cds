import { ReactElement } from 'react';
import { SharedProps } from '@cbhq/cds-common';
import { TableSectionProps } from './tableSectionTypes';

/**
 * The table variant will be provided via context and available
 * to any internal Table component (TableBody, TableCell, etc)
 * @default undefined
 */
export type TableVariant = 'default' | 'graph' | 'ruled';
export type TableLayout = 'auto' | 'fixed';

export type TableCtx = TableVariant | undefined;

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
  children: ReactElement<TableSectionProps> | ReactElement<TableSectionProps>[];
  /**
   * When provided, we'll apply a bordered around the entire table
   */
  bordered?: boolean;
  /**
   * Use tableLayout='fixed' if you need full control over cell width
   * @default 'auto'
   */
  tableLayout?: TableLayout;
} & SharedProps;
