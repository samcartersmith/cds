import React, { memo, useCallback } from 'react';
import {
  SparklineInteractivePeriodProps,
  SparklineInteractivePeriodSelectorProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

import { useAccessibleForeground } from '../../color/useAccessibleForeground';
import { usePalette } from '../../hooks/usePalette';
import { HStack } from '../../layout';
import { PressableOpacity } from '../../system/PressableOpacity';
import { TextLabel1 } from '../../typography/TextLabel1';

function SparklineInteractivePeriodWithGeneric<Period extends string>({
  period,
  selectedPeriod,
  setSelectedPeriod,
  color,
}: SparklineInteractivePeriodProps<Period>) {
  const handleOnPress = useCallback(() => {
    setSelectedPeriod(period.value);
  }, [period, setSelectedPeriod]);
  const colors = usePalette();
  return (
    <PressableOpacity onPress={handleOnPress}>
      <TextLabel1
        as="span"
        spacingHorizontal={2}
        spacingVertical={3}
        dangerouslySetColor={period.value === selectedPeriod ? color : colors.foregroundMuted}
      >
        {period.label}
      </TextLabel1>
    </PressableOpacity>
  );
}

const SparklineInteractivePeriod = memo(
  SparklineInteractivePeriodWithGeneric,
) as typeof SparklineInteractivePeriodWithGeneric;

export const SparklineInteractivePeriodSelector = <Period extends string>({
  selectedPeriod,
  setSelectedPeriod,
  periods,
  color,
}: SparklineInteractivePeriodSelectorProps<Period>) => {
  const accessibleForeground = useAccessibleForeground({
    color,
    usage: 'normalText',
  });

  return (
    <HStack justifyContent="space-between" width="100%" spacing={0}>
      {periods.map((period) => (
        <SparklineInteractivePeriod
          key={period.value}
          period={period}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          color={accessibleForeground}
        />
      ))}
    </HStack>
  );
};
