import React, { memo, useCallback } from 'react';
import { Animated } from 'react-native';
import { useAccessibleForeground } from '../../color/useAccessibleForeground';
import { usePalette } from '../../hooks/usePalette';
import { HStack } from '../../layout/HStack';
import { PressableOpacity } from '../../system/PressableOpacity';
import { TextLabel1 } from '../../typography';

import { Haptics } from '../../utils/haptics';

import { useChartContext } from './ChartProvider';

type ChartPeriodSelectorProps<Period extends string> = {
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
  periods: { label: string; value: Period }[];
  color: string;
};

type ChartPeriodProps<Period extends string> = {
  period: { label: string; value: Period };
  selectedPeriod: Period;
  setSelectedPeriod: ChartPeriodSelectorProps<Period>['setSelectedPeriod'];
  color: string;
};

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
  const { markerOpacity } = useChartContext();
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
          <ChartPeriod
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

function ChartPeriodWithGeneric<Period extends string>({
  period,
  selectedPeriod,
  setSelectedPeriod,
  color,
}: ChartPeriodProps<Period>) {
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

const ChartPeriod = memo(ChartPeriodWithGeneric) as typeof ChartPeriodWithGeneric;
