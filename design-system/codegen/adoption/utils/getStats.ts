import { sumBy } from 'lodash';
import type { ProjectParser } from '../parsers/ProjectParser';
import { formatDate } from './formatDate';

export type AdoptionStats = ReturnType<typeof getStats>;
export type ComponentData = ProjectParser['components'];

export function getStats(data: ComponentData, dateOverride?: string) {
  const { cds, presentational, other } = data;
  const totalCds = sumBy(cds, 'totalInstances');
  const totalPresentational = sumBy(presentational, 'totalInstances');
  const totalCdsAndPresentational = totalCds + totalPresentational;
  const totalOther = sumBy(other, 'totalInstances');

  return {
    date: formatDate(dateOverride ? new Date(dateOverride) : new Date(), {
      hour: undefined,
      minute: undefined,
    }),
    cdsPercent: totalCds / totalCdsAndPresentational,
    cds: totalCds,
    presentational: totalPresentational,
    totalCdsAndPresentational,
    totalOther,
  };
}
