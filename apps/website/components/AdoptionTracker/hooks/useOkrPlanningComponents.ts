import { useMemo } from 'react';
import { getCdsRecs } from '../utils/getCdsRecs';
import { useAdopterComponents } from './useAdopterComponents';

export function useOkrPlanningComponents() {
  const presentationalComponents = useAdopterComponents().presentational.components;
  return useMemo(
    () =>
      presentationalComponents.filter((item) => {
        const recs = getCdsRecs(item.name);
        return recs.length > 0;
      }),
    [presentationalComponents],
  );
}
