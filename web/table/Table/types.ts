import { ReactElement } from 'react';

export type TableVariant = 'default' | 'graph' | 'ruled';

export type TableCtx = {
  /**
   * The table variant will be provided via context and available
   * to any internal Table component (TableBody, TableCell, etc)
   * @default undefined
   */
  variant?: TableVariant;
};

export type TableProps = {
  /**
   * Linaria flavored className.
   * @default undefined
   */
  className?: string;
  /**
   * The variant prop allows clients to use a
   * CDS approved style for their Table.
   * @default undefined
   */
  variant?: TableVariant;
  /**
   * Children are required, and should always include a TableBody.
   * TableHead and TableFoot are both optional, and will magically
   * flow into the correct place in the table (top/bottom)
   */
  children: ReactElement<unknown> | ReactElement<unknown>[]; // Unkowns will use TableSecion types in a later PR
  /**
   * When provided, we'll apply a border around the entire table
   */
  border?: boolean;
};
