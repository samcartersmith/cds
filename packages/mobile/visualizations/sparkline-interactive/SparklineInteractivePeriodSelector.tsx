import React, { memo, useCallback, useMemo } from 'react';
import { Animated } from 'react-native';
import { periodLabelMap } from '@cbhq/cds-common/tokens/sparkline';
import {
  SparklineInteractivePeriodProps,
  SparklineInteractivePeriodSelectorProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

import { useAccessibleForeground } from '../../color/useAccessibleForeground';
import { usePalette } from '../../hooks/usePalette';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { Pressable } from '../../system/Pressable';
import { TextLabel1 } from '../../typography';
import { Haptics } from '../../utils/haptics';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

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
  const { markerOpacity } = useSparklineInteractiveContext();
  return (
    <Animated.View
      style={{
        opacity: markerOpacity.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        }),
      }}
    >
      <HStack justifyContent="space-between" spacing={0}>
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
    </Animated.View>
  );
};

function SparklineInteractivePeriodWithGeneric<Period extends string>({
  period,
  selectedPeriod,
  setSelectedPeriod,
  color,
}: SparklineInteractivePeriodProps<Period>) {
  const isSelected = period.value === selectedPeriod;
  const periodLabel = periodLabelMap[period.label] ?? period.label;
  const periodHint = useMemo(
    () =>
      isSelected
        ? `Currently showing data for the ${periodLabel} timeframe`
        : `Show data for the ${periodLabel} timeframe`,
    [isSelected, periodLabel],
  );

  const handleOnPress = useCallback(() => {
    void Haptics.lightImpact();
    setSelectedPeriod(period.value);
  }, [period, setSelectedPeriod]);
  const colors = usePalette();

  const textStyle = useMemo(
    () => ({
      color: isSelected ? color : colors.foregroundMuted,
    }),
    [color, colors.foregroundMuted, isSelected],
  );

  const accessibilityState = useMemo(
    () => ({
      selected: isSelected,
    }),
    [isSelected],
  );

  return (
    <Box spacingVertical={2} alignItems="center" justifyContent="center">
      <Pressable
        borderRadius="round"
        backgroundColor={isSelected ? 'primaryWash' : 'background'}
        borderColor="transparent"
        onPress={handleOnPress}
        accessibilityLabel={periodLabel}
        accessibilityHint={periodHint}
        accessibilityState={accessibilityState}
      >
        <TextLabel1 spacingHorizontal={2} spacingVertical={1} dangerouslySetStyle={textStyle}>
          {period.label}
        </TextLabel1>
      </Pressable>
    </Box>
  );
}

const SparklineInteractivePeriod = memo(
  SparklineInteractivePeriodWithGeneric,
) as typeof SparklineInteractivePeriodWithGeneric;
