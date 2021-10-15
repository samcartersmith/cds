import React, { memo } from 'react';
import { TableContext } from './context/TableContext';
import { useTableStyles } from './hooks/useTableStyles';
import { TableProps } from './types/tableTypes';
import { table } from './styles/tableStyles';

export type { TableProps, TableVariant } from './types/tableTypes';
export const Table = memo(({ children, variant, border }: TableProps) => {
  const variantStyles = useTableStyles({ variant, border });

  return (
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    <TableContext.Provider value={{ variant }}>
      <div className={variantStyles}>
        <table className={table}>{children}</table>
      </div>
    </TableContext.Provider>
  );
});

Table.displayName = 'Table';
