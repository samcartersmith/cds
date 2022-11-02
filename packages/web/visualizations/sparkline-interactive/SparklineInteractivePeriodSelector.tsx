import React, { memo, useCallback, useMemo } from 'react';
import { periodLabelMap } from '@cbhq/cds-common/tokens/sparkline';
import {
  SparklineInteractivePeriodProps,
  SparklineInteractivePeriodSelectorProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

import { useAccessibleForeground } from '../../color/useAccessibleForeground';
import { usePalette } from '../../hooks/usePalette';
import { Box, HStack } from '../../layout';
import { Pressable } from '../../system/Pressable';
import { TextLabel1 } from '../../typography/TextLabel1';

function SparklineInteractivePeriodWithGeneric<Period extends string>({
  period,
  selectedPeriod,
  setSelectedPeriod,
  color,
}: SparklineInteractivePeriodProps<Period>) {
  const periodLabel = periodLabelMap[period.label] ?? period.label;
  const isSelected = period.value === selectedPeriod;

  const handleOnPress = useCallback(() => {
    setSelectedPeriod(period.value);
  }, [period, setSelectedPeriod]);
  const colors = usePalette();

  const background = useMemo(() => (isSelected ? 'primaryWash' : 'transparent'), [isSelected]);

  return (
    <Box alignItems="center" justifyContent="center" height="fit-content">
      <Pressable
        borderRadius="round"
        backgroundColor={background}
        onPress={handleOnPress}
        accessibilityLabel={periodLabel}
        aria-pressed={isSelected}
      >
        <TextLabel1
          as="span"
          display="block"
          spacingHorizontal={2}
          spacingVertical={1}
          dangerouslySetColor={isSelected ? color : colors.foregroundMuted}
          noWrap
        >
          {period.label}
        </TextLabel1>
      </Pressable>
    </Box>
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
    enhanced: true,
  });

  return (
    <HStack justifyContent="space-between" width="100%" spacing={0} spacingHorizontal={1}>
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
