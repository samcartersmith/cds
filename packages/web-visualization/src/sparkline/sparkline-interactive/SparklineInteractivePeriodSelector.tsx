import React, { memo, useCallback, useMemo } from 'react';
import { periodLabelMap } from '@cbhq/cds-common/tokens/sparkline';
import {
  SparklineInteractivePeriodProps,
  SparklineInteractivePeriodSelectorProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { useAccessibleForeground } from '@cbhq/cds-web/color/useAccessibleForeground';
import { usePalette } from '@cbhq/cds-web/hooks/usePalette';
import { Box, HStack } from '@cbhq/cds-web/layout';
import { Pressable } from '@cbhq/cds-web/system/Pressable';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';

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
    <Box alignItems="center" height="fit-content" justifyContent="center">
      <Pressable
        accessibilityLabel={periodLabel}
        aria-pressed={isSelected}
        background={background}
        borderRadius="rounded"
        onPress={handleOnPress}
      >
        <TextLabel1
          noWrap
          as="span"
          dangerouslySetColor={isSelected ? color : colors.foregroundMuted}
          display="block"
          spacingHorizontal={2}
          spacingVertical={1}
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
    <HStack justifyContent="space-between" spacingHorizontal={1} width="100%">
      {periods.map((period) => (
        <SparklineInteractivePeriod
          key={period.value}
          color={accessibleForeground}
          period={period}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
      ))}
    </HStack>
  );
};
