import React, { memo, useCallback, useMemo } from 'react';
import { LayoutChangeEvent, ScrollView, StyleSheet } from 'react-native';
import { periodLabelMap } from '@cbhq/cds-common/tokens/sparkline';
import {
  SparklineInteractivePeriodProps,
  SparklineInteractivePeriodSelectorProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

import { useAccessibleForeground } from '../../color/useAccessibleForeground';
import { useHorizontallyScrollingPressables } from '../../hooks/useHorizontallyScrollingPressables';
import { usePalette } from '../../hooks/usePalette';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { Pressable } from '../../system/Pressable';
import { TextLabel1 } from '../../typography';
import { Haptics } from '../../utils/haptics';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

const periodSelectorStyles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  hStackContainer: {
    flex: 1,
  },
});

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
  const {
    scrollRef,
    isScrollContentOverflowing,
    isScrollContentOffscreenRight,
    handleScroll,
    handleScrollContainerLayout,
    handleScrollContentSizeChange,
    getPressableLayoutHandler,
  } = useHorizontallyScrollingPressables(selectedPeriod);

  const opacity = markerOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Box
      overflow={
        isScrollContentOverflowing && isScrollContentOffscreenRight ? 'gradient' : 'visible'
      }
      animated
      opacity={opacity}
      background="background"
    >
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        onScroll={handleScroll}
        onLayout={handleScrollContainerLayout}
        onContentSizeChange={handleScrollContentSizeChange}
        contentContainerStyle={periodSelectorStyles.scrollViewContainer}
      >
        <HStack
          dangerouslySetStyle={periodSelectorStyles.hStackContainer}
          spacing={0}
          justifyContent="space-between"
        >
          {periods.map((period) => (
            <SparklineInteractivePeriod
              key={period.value}
              period={period}
              getLayoutHandler={getPressableLayoutHandler}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              color={accessibleForeground}
            />
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};

function SparklineInteractivePeriodWithGeneric<Period extends string>({
  period,
  selectedPeriod,
  setSelectedPeriod,
  getLayoutHandler,
  color,
}: SparklineInteractivePeriodProps<Period> & {
  getLayoutHandler: (id: string) => ({ nativeEvent: { layout } }: LayoutChangeEvent) => void;
}) {
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
    <Box
      key={period.value}
      spacingVertical={2}
      alignItems="center"
      justifyContent="center"
      onLayout={getLayoutHandler(period.value)}
    >
      <Pressable
        borderRadius="roundedFull"
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
