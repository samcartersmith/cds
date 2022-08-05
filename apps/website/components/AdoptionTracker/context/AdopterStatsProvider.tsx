import React, { createContext, memo } from 'react';

import type { AdopterStats, AdopterStatsItem } from ':cds-website/components/AdoptionTracker/types';

export const statsFallback = {
  latest: {
    date: '',
    cdsPercent: 0,
    cds: 0,
    presentational: 0,
    totalCdsAndPresentational: 0,
    totalOther: 0,
  } as AdopterStatsItem,
  previous: [] as AdopterStatsItem[],
};

export const AdopterStatsContext = createContext(statsFallback);

export const AdopterStatsProvider: React.FC<AdopterStats> = memo(({ children, ...stats }) => {
  return <AdopterStatsContext.Provider value={stats}>{children}</AdopterStatsContext.Provider>;
});
