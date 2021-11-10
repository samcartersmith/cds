import { ReactNode } from 'react';
import {
  compactListHeight,
  compactListHeightWithDescription,
  listHeight,
  listHeightWithDescription,
} from '../tokens/cell';
import { ScaleDensity } from '../types';

export const useListCellMinHeight = (
  description: ReactNode,
  compact: boolean | undefined,
): Record<ScaleDensity, number> => {
  if (description) {
    return compact ? compactListHeightWithDescription : listHeightWithDescription;
  }
  return compact ? compactListHeight : listHeight;
};
