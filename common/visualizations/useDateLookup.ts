import { useCallback } from 'react';
import { GetFormattedDateParams } from '../types/SparklineInteractiveBaseProps';

export function useDateLookup<Period extends string>({
  getMarker,
  formatDate,
  selectedPeriod,
}: GetFormattedDateParams<Period>) {
  return useCallback(
    (xPos: number) => {
      const { date } = getMarker(xPos) ?? {};
      if (!date) {
        return '';
      }
      return formatDate(date, selectedPeriod);
    },
    [formatDate, getMarker, selectedPeriod],
  );
}
