import React, { memo, useCallback, useMemo } from 'react';
import { Animated } from 'react-native';
import {
  SparklineInteractivePeriodProps,
  SparklineInteractivePeriodSelectorProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

import { useAccessibleForeground } from '../../color/useAccessibleForeground';
import { usePalette } from '../../hooks/usePalette';
import { Box } from '../../layout/Box';
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

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: period.value === selectedPeriod ? colors.primaryWash : undefined,
    }),
    [colors.primaryWash, period.value, selectedPeriod],
  );

  const textStyle = useMemo(
    () => ({
      color: period.value === selectedPeriod ? color : colors.foregroundMuted,
    }),
    [color, colors.foregroundMuted, period.value, selectedPeriod],
  );

  return (
    <Box spacingVertical={2} alignItems="center" justifyContent="center">
      <Box
        borderRadius="round"
        alignItems="center"
        justifyContent="center"
        dangerouslySetStyle={backgroundStyle}
      >
        <PressableOpacity onPress={handleOnPress}>
          <TextLabel1 spacingHorizontal={2} spacingVertical={1} dangerouslySetStyle={textStyle}>
            {period.label}
          </TextLabel1>
        </PressableOpacity>
      </Box>
    </Box>
  );
}

const SparklineInteractivePeriod = memo(
  SparklineInteractivePeriodWithGeneric,
) as typeof SparklineInteractivePeriodWithGeneric;
