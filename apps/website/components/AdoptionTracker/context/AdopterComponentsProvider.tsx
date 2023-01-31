import React, { createContext, memo, useMemo } from 'react';
import orderBy from 'lodash/orderBy';
import sumBy from 'lodash/sumBy';

import type {
  AdopterComponents,
  ComponentData,
} from ':cds-website/components/AdoptionTracker/types';

const AdopterComponentsGroupFallback = {
  totalInstances: 0,
  components: [] as ComponentData[],
};

export const AdopterComponentsContextFallback = {
  cds: AdopterComponentsGroupFallback,
  presentational: AdopterComponentsGroupFallback,
  other: AdopterComponentsGroupFallback,
};

export const AdopterComponentsContext = createContext(AdopterComponentsContextFallback);

function getComponentsInfo(data: ComponentData[]) {
  const totalInstances = sumBy(data, 'totalInstances');
  const components = orderBy(data, ['totalInstances', 'name'], ['desc', 'asc']);
  return {
    totalInstances,
    components,
  };
}

export const AdopterComponentsProvider: React.FC<React.PropsWithChildren<AdopterComponents>> = memo(
  ({ cds, presentational, other, children }) => {
    const value = useMemo(
      () => ({
        cds: getComponentsInfo(cds),
        presentational: getComponentsInfo(presentational),
        other: getComponentsInfo(other),
      }),
      [cds, other, presentational],
    );

    return (
      <AdopterComponentsContext.Provider value={value}>
        {children}
      </AdopterComponentsContext.Provider>
    );
  },
);
