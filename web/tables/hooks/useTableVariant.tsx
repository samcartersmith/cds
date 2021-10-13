import { useContext } from 'react';
import { TableContext } from '../context/TableContext';

export const useTableVariant = () => {
  const { variant = 'default' } = useContext(TableContext);

  return variant;
};
