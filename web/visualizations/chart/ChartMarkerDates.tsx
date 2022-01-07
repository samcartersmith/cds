import { ChartMarkerDatesProps } from '@cbhq/cds-common/types/InteractiveSparklineBaseProps';
import React, { useState, FunctionComponent, memo, useCallback, useMemo } from 'react';
import times from 'lodash/times';
import { useDateLookup } from '@cbhq/cds-common/visualizations/useDateLookup';
import { Box } from '../../layout';
import { TextLabel2 } from '../../typography/TextLabel2';
import { fadeInClassName } from './fade';

const labelWidth = 125;

const ChartMarkerDate: FunctionComponent<{
  getFormattedDate: (xPosition: number) => string;
}> = memo(({ getFormattedDate }) => {
  const [xPos, setXPos] = useState<number>(0);
  const setupRef = useCallback((ref: HTMLSpanElement) => {
    if (ref) {
      setXPos(ref?.offsetLeft);
    }
  }, []);

  const dateStr = getFormattedDate(xPos);

  // take up space while loading so when it finishes loading there is no jump
  const fallback = <span style={{ visibility: 'hidden' }}>-</span>;
  return (
    <span ref={setupRef}>
      <TextLabel2 as="span" color="foregroundMuted" align="center" spacingTop={3}>
        {dateStr || fallback}
      </TextLabel2>
    </span>
  );
});

function ChartMarkerDatesWithGeneric<Period extends string>({
  formatDate,
  selectedPeriod,
  getMarker,
}: ChartMarkerDatesProps<Period>) {
  const [numberOfLabels, setNumberOfLabels] = useState(0);
  const getFormattedDate = useDateLookup({
    getMarker,
    formatDate,
    selectedPeriod,
  });

  const setupRef = useCallback((ref: HTMLDivElement) => {
    if (ref) {
      const numberOfLabelsFromWidth = Math.floor(ref.offsetWidth / labelWidth);
      setNumberOfLabels(numberOfLabelsFromWidth);
    }
  }, []);

  const markers = useMemo(() => {
    return times(numberOfLabels).map((_, i) => {
      // eslint-disable-next-line react/no-array-index-key
      return <ChartMarkerDate key={i} getFormattedDate={getFormattedDate} />;
    });
  }, [getFormattedDate, numberOfLabels]);

  return (
    <Box
      key={selectedPeriod}
      ref={setupRef}
      position="relative"
      background="background"
      justifyContent="space-between"
      width="100%"
      spacingTop={2}
      dangerouslySetClassName={fadeInClassName}
    >
      {markers}
    </Box>
  );
}

export const ChartMarkerDates = memo(
  ChartMarkerDatesWithGeneric,
) as typeof ChartMarkerDatesWithGeneric;
