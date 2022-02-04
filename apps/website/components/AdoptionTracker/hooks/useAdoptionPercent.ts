import { getPercentageText } from '../utils/getPercentageText';

import { useAdopterComponents } from './useAdopterComponents';

export function useAdoptionPercent(variant: 'cds' | 'presentational') {
  const groups = useAdopterComponents();
  const totalInstances = groups.cds.totalInstances + groups.presentational.totalInstances;
  return getPercentageText(groups[variant].totalInstances, totalInstances);
}
