import React, { memo, useCallback, useMemo } from 'react';
import { LayoutChangeEvent, ScrollView, StyleSheet } from 'react-native';
import { periodLabelMap } from '@cbhq/cds-common/tokens/sparkline';
import {
  SparklineInteractivePeriodProps,
  SparklineInteractivePeriodSelectorProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { useAccessibleForeground } from '@cbhq/cds-mobile/color/useAccessibleForeground';
import { useHorizontallyScrollingPressables } from '@cbhq/cds-mobile/hooks/useHorizontallyScrollingPressables';
import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { Box } from '@cbhq/cds-mobile/layout/Box';
import { HStack } from '@cbhq/cds-mobile/layout/HStack';
import { Pressable } from '@cbhq/cds-mobile/system/Pressable';
import { TextLabel1 } from '@cbhq/cds-mobile/typography';
import { Haptics } from '@cbhq/cds-mobile/utils/haptics';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

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
      alignItems="center"
      justifyContent="center"
      onLayout={getLayoutHandler(period.value)}
      spacingVertical={2}
    >
      <Pressable
        accessibilityHint={periodHint}
        accessibilityLabel={periodLabel}
        accessibilityState={accessibilityState}
        backgroundColor={isSelected ? 'primaryWash' : 'background'}
        borderColor="transparent"
        borderRadius="roundedFull"
        onPress={handleOnPress}
      >
        <TextLabel1 dangerouslySetStyle={textStyle} spacingHorizontal={2} spacingVertical={1}>
          {period.label}
        </TextLabel1>
      </Pressable>
    </Box>
  );
}

const periodSelectorStyles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  hStackContainer: {
    flex: 1,
  },
});

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
      animated
      background="background"
      opacity={opacity}
      overflow={
        isScrollContentOverflowing && isScrollContentOffscreenRight ? 'gradient' : 'visible'
      }
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        contentContainerStyle={periodSelectorStyles.scrollViewContainer}
        onContentSizeChange={handleScrollContentSizeChange}
        onLayout={handleScrollContainerLayout}
        onScroll={handleScroll}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
      >
        <HStack
          dangerouslySetStyle={periodSelectorStyles.hStackContainer}
          justifyContent="space-between"
          spacing={0}
        >
          {periods.map((period) => (
            <SparklineInteractivePeriod
              key={period.value}
              color={accessibleForeground}
              getLayoutHandler={getPressableLayoutHandler}
              period={period}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
            />
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};
