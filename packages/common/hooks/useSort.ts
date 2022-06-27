import { useMemo } from 'react';
import get from 'lodash/get';

import { RecursiveKeyOf } from '../types/Helpers';

type UseSortParams<T> = Readonly<{
  /** An array of data we want to sort.  */
  data: Readonly<T[]>;
  /**
   * Key for the item we're sorting.
   * Use null/undefined to sort a simple array of strings or numbers
   * @example 'asset.name'
   */
  sortBy?: RecursiveKeyOf<T>;
  /**
   * The direction to sort items.
   * @default 'ASC'
   */
  sortDirection?: 'ASC' | 'DESC';
}>;

export const useSort = <T>({ data, sortBy, sortDirection }: UseSortParams<T>) => {
  return useMemo(() => {
    // Spread to avoid overwriting in place
    return [...data].sort((a, b) => {
      // Descending
      if (sortDirection === 'DESC') {
        return (sortBy ? get(a, sortBy) : a) > (sortBy ? get(b, sortBy) : b) ? -1 : 1;
      }

      // Ascending (Default)
      return (sortBy ? get(b, sortBy) : b) > (sortBy ? get(a, sortBy) : a) ? -1 : 1;
    });
  }, [data, sortDirection, sortBy]);
};
