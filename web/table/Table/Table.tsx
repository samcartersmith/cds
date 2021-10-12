import React, { memo } from 'react';
import { cx } from 'linaria';
import { TableContext } from '../context';
import { useTableStyles } from './hooks/useTableStyles';
import { TableProps } from './types';
import { table } from './styles';

export const Table = memo(function Table({ className, children, variant, border }: TableProps) {
  const variantStyles = useTableStyles({ variant, border });

  const wrapperStyles = cx(variantStyles, className);

  return (
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    <TableContext.Provider value={{ variant }}>
      <div className={wrapperStyles}>
        <table className={cx(table)}>{children}</table>
      </div>
    </TableContext.Provider>
  );
});
