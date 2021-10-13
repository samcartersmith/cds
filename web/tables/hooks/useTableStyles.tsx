import { cx } from 'linaria';
import { useMemo } from 'react';
import {
  tableVariantBase,
  tableVariantGraph,
  tableVariantRuled,
  tableBorder,
} from '../styles/tableStyles';
import { TableVariant } from '../types/tableTypes';

type Props = {
  variant?: TableVariant;
  border?: boolean;
};
export const useTableStyles = ({ variant, border }: Props) => {
  return useMemo(() => {
    switch (variant) {
      case 'graph':
        return cx(tableVariantBase, tableVariantGraph, border && tableBorder);

      case 'ruled':
        return cx(tableVariantBase, tableVariantRuled, border && tableBorder);

      case 'default':
      default:
        return cx(tableVariantBase, border && tableBorder);
    }
  }, [variant, border]);
};
