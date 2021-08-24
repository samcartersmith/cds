import { useAdopterComponents } from './useAdopterComponents';

function getPercentageText(partial: number, total: number) {
  return `${Number((partial / total) * 100).toFixed(2)}%`;
}

export function useAdoptionPercent(variant: 'cds' | 'presentational') {
  const groups = useAdopterComponents();
  const totalInstances = groups.cds.totalInstances + groups.presentational.totalInstances;
  return getPercentageText(groups[variant].totalInstances, totalInstances);
}
