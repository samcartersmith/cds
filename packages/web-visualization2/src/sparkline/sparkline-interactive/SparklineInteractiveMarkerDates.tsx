import React, { memo, useCallback, useMemo, useState } from 'react';
import times from 'lodash/times';
import { SparklineInteractiveMarkerDatesProps } from '@cbhq/cds-common2/types/SparklineInteractiveBaseProps';
import { useDateLookup } from '@cbhq/cds-common2/visualizations/useDateLookup';
import { HStack } from '@cbhq/cds-web2/layout';
import { TextLabel2 } from '@cbhq/cds-web2/typography/TextLabel2';

import { fadeInClassName } from './fade';

const labelWidth = 125;
const noPointerEvents = { pointerEvents: 'none' } as const;

const SparklineInteractiveMarkerDate: React.FunctionComponent<
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
      <TextLabel2 as="span" color="fgMuted" textAlign="center">
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
      return <SparklineInteractiveMarkerDate key={i} getFormattedDate={getFormattedDate} />;
    });
  }, [getFormattedDate, numberOfLabels]);

  return (
    <HStack
      key={selectedPeriod}
      ref={setupRef}
      className={fadeInClassName}
      justifyContent="space-between"
      paddingX={timePeriodGutter}
      style={noPointerEvents}
      width="100%"
    >
      {markers}
    </HStack>
  );
}

export const SparklineInteractiveMarkerDates = memo(
  SparklineInteractiveMarkerDatesWithGeneric,
) as typeof SparklineInteractiveMarkerDatesWithGeneric;
