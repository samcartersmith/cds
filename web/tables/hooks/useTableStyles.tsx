import { cx } from 'linaria';
import { useMemo } from 'react';
import {
  tableVariantBase,
  tableVariantGraph,
  tableVariantRuled,
  tableBorder,
} from '../styles/tableStyles';
import { TableProps } from '../types/tableTypes';

export const useTableStyles = ({ variant, bordered }: Pick<TableProps, 'bordered' | 'variant'>) => {
  return useMemo(() => {
    switch (variant) {
      case 'graph':
        return cx(tableVariantBase, tableVariantGraph, bordered && tableBorder);

      case 'ruled':
        return cx(tableVariantBase, tableVariantRuled, bordered && tableBorder);

      case 'default':
      default:
        return cx(tableVariantBase, bordered && tableBorder);
    }
  }, [variant, bordered]);
};
