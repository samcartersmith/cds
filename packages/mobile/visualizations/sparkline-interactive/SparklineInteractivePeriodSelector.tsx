import React, { memo, useCallback } from 'react';
import { Animated } from 'react-native';
import {
  SparklineInteractivePeriodProps,
  SparklineInteractivePeriodSelectorProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

import { useAccessibleForeground } from '../../color/useAccessibleForeground';
import { usePalette } from '../../hooks/usePalette';
import { HStack } from '../../layout/HStack';
import { PressableOpacity } from '../../system/PressableOpacity';
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
  const handleOnPress = useCallback(() => {
    void Haptics.lightImpact();
    setSelectedPeriod(period.value);
  }, [period, setSelectedPeriod]);
  const colors = usePalette();
  return (
    <PressableOpacity onPress={handleOnPress}>
      <TextLabel1
        spacingHorizontal={2}
        spacingVertical={3}
        dangerouslySetStyle={{
          color: period.value === selectedPeriod ? color : colors.foregroundMuted,
        }}
      >
        {period.label}
      </TextLabel1>
    </PressableOpacity>
  );
}

const SparklineInteractivePeriod = memo(
  SparklineInteractivePeriodWithGeneric,
) as typeof SparklineInteractivePeriodWithGeneric;
