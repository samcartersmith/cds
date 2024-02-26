import React, { FunctionComponent, memo, useCallback, useMemo, useState } from 'react';
import times from 'lodash/times';
import { SparklineInteractiveMarkerDatesProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { useDateLookup } from '@cbhq/cds-common/visualizations/useDateLookup';
import { Box } from '@cbhq/cds-web/layout';
import { TextLabel2 } from '@cbhq/cds-web/typography/TextLabel2';

import { fadeInClassName } from './fade';

const labelWidth = 125;

const SparklineInteractiveMarkerDate: FunctionComponent<
  React.PropsWithChildren<{
    getFormattedDate: (xPosition: number) => string;
  }>
> = memo(({ getFormattedDate }) => {
  const [xPos, setXPos] = useState<number>(0);
  const setupRef = useCallback((ref: HTMLSpanElement | null) => {
    if (ref) {
      setXPos(ref.offsetLeft + ref.offsetWidth / 2);
    }
  }, []);

  const dateStr = getFormattedDate(xPos);

  // take up space while loading so when it finishes loading there is no jump
  const fallback = <span style={{ visibility: 'hidden' }}>-</span>;
  return (
    <span ref={setupRef}>
      <TextLabel2 align="center" as="span" color="foregroundMuted" spacingTop={3}>
        {dateStr || fallback}
      </TextLabel2>
    </span>
  );
});

function SparklineInteractiveMarkerDatesWithGeneric<Period extends string>({
  formatDate,
  selectedPeriod,
  getMarker,
  timePeriodGutter = 2,
}: SparklineInteractiveMarkerDatesProps<Period>) {
  const [numberOfLabels, setNumberOfLabels] = useState(0);
  const getFormattedDate = useDateLookup({
    getMarker,
    formatDate,
    selectedPeriod,
  });

  const setupRef = useCallback((ref: HTMLDivElement) => {
    if (ref) {
      const numberOfLabelsFromWidth = Math.floor(ref.offsetWidth / labelWidth);
      setNumberOfLabels(Math.max(numberOfLabelsFromWidth, 4));
    }
  }, []);

  const markers = useMemo(() => {
    return times(numberOfLabels).map((_, i) => {
      // eslint-disable-next-line react/no-array-index-key
      return <SparklineInteractiveMarkerDate key={i} getFormattedDate={getFormattedDate} />;
    });
  }, [getFormattedDate, numberOfLabels]);

  return (
    <Box
      key={selectedPeriod}
      ref={setupRef}
      background="background"
      className={fadeInClassName}
      justifyContent="space-between"
      position="relative"
      spacingHorizontal={timePeriodGutter}
      spacingTop={2}
      width="100%"
    >
      {markers}
    </Box>
  );
}

export const SparklineInteractiveMarkerDates = memo(
  SparklineInteractiveMarkerDatesWithGeneric,
) as typeof SparklineInteractiveMarkerDatesWithGeneric;
