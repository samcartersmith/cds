import { call, cond, eq, onChange, useCode } from 'react-native-reanimated';
import { ChartGetMarker, ChartScrubParams } from '@cbhq/cds-common/types';
import { noop } from '@cbhq/cds-utils';

import { useChartContext } from './ChartProvider';

type UpdateChartHeaderParams<Period> = {
  getMarker: ChartGetMarker;
  selectedPeriod: Period;
  onScrub?: (params: ChartScrubParams<Period>) => void;
};
export function useUpdateChartHeader<Period extends string>({
  getMarker,
  selectedPeriod,
  onScrub = noop,
}: UpdateChartHeaderParams<Period>) {
  const { markerXPosition, markerGestureState } = useChartContext();

  useCode(
    () => [
      onChange(
        markerXPosition,
        cond(
          eq(markerGestureState, 1),
          call([markerXPosition], ([xPos]) => {
            const dataPoint = getMarker(xPos);
            if (dataPoint) {
              onScrub({
                point: dataPoint,
                period: selectedPeriod,
              });
            }
          }),
        ),
      ),
    ],
    [markerGestureState, getMarker, onScrub, selectedPeriod],
  );
}
