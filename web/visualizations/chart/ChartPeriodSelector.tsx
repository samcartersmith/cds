import React, { memo, useCallback } from 'react';
import {
  ChartPeriodProps,
  ChartPeriodSelectorProps,
} from '@cbhq/cds-common/types/InteractiveSparklineBaseProps';
import { useAccessibleForeground } from '../../color/useAccessibleForeground';
import { HStack } from '../../layout';
import { usePalette } from '../../hooks/usePalette';
import { PressableOpacity } from '../../system/PressableOpacity';
import { TextLabel1 } from '../../typography/TextLabel1';

function ChartPeriodWithGeneric<Period extends string>({
  period,
  selectedPeriod,
  setSelectedPeriod,
  color,
}: ChartPeriodProps<Period>) {
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

const ChartPeriod = memo(ChartPeriodWithGeneric) as typeof ChartPeriodWithGeneric;

export const ChartPeriodSelector = <Period extends string>({
  selectedPeriod,
  setSelectedPeriod,
  periods,
  color,
}: ChartPeriodSelectorProps<Period>) => {
  const accessibleForeground = useAccessibleForeground({
    color,
    usage: 'normalText',
  });

  return (
    <HStack justifyContent="space-between" spacing={0}>
      {periods.map((period) => (
        <ChartPeriod
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
