import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { periodLabelMap } from '@cbhq/cds-common/tokens/sparkline';
import {
  SparklineInteractivePeriodProps,
  SparklineInteractivePeriodSelectorProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

import { useAccessibleForeground } from '../../color/useAccessibleForeground';
import { useDimensions } from '../../hooks/useDimensions';
import { usePalette } from '../../hooks/usePalette';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { Pressable } from '../../system/Pressable';
import { TextLabel1 } from '../../typography';
import { Haptics } from '../../utils/haptics';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

type ScrollDetails = { xPosition: number; width: number };
type PeriodsLayoutsMap = Map<string, LayoutRectangle>;

const fallbackLayout: LayoutRectangle = { width: 0, x: 0, y: 0, height: 0 };

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
  const scrollRef = useRef<ScrollView>(null);
  const scrollDetails = useRef<ScrollDetails>({ xPosition: 0, width: 0 });
  const periodsLayoutsMap = useRef<PeriodsLayoutsMap>(new Map());
  const { screenWidth } = useDimensions();
  const [isOverflowing, setIsOverflowing] = useState<null | boolean>(null);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollDetails.current.xPosition = event.nativeEvent.contentOffset.x;
  }, []);

  const handleOnLayout = useCallback((event: LayoutChangeEvent) => {
    scrollDetails.current.width = event.nativeEvent.layout.width;
  }, []);

  const opacity = markerOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const handleActivePeriodUpdate = useCallback((layout: LayoutRectangle) => {
    /** Check if active tab is offscreen and trigger a scroll event */
    const isOffscreenLeft = layout.x < scrollDetails.current?.xPosition;
    let isOffscreenRight = false;
    if (scrollDetails.current) {
      isOffscreenRight =
        layout.x + layout.width - scrollDetails.current.xPosition > scrollDetails.current?.width;
    }

    const isOffscreen = isOffscreenLeft || isOffscreenRight;

    if (isOffscreen) {
      scrollRef.current?.scrollTo({ x: layout.x, animated: true });
    }
  }, []);

  const handleContentSizeChange = useCallback(
    (contentWidth: number | LayoutChangeEvent) => {
      const width =
        typeof contentWidth === 'number' ? contentWidth : contentWidth.nativeEvent.layout.width;

      if (width > screenWidth) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    },
    [setIsOverflowing, screenWidth],
  );

  const getOnLayoutHandler = useCallback(
    (id: string) => {
      return function onLayout({ nativeEvent: { layout } }: LayoutChangeEvent) {
        periodsLayoutsMap.current.set(id, layout);
        if (id === selectedPeriod) handleActivePeriodUpdate(layout);
      };
    },
    [handleActivePeriodUpdate, selectedPeriod],
  );

  /** ⚡️ Side effects 🛼
   *  We need to keep an eye on the value because
   *  we'll have to calculate everything and handle
   *  scroll and layout events whenever it updates
   */
  useEffect(() => {
    const layout = periodsLayoutsMap.current.get(selectedPeriod) ?? fallbackLayout;
    /** Set the active tab */
    handleActivePeriodUpdate(layout);
  }, [selectedPeriod, handleActivePeriodUpdate]);

  const styles = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
    },
    hStackContainer: {
      flex: 1,
    },
  });

  return (
    <Box
      overflow={isOverflowing ? 'gradient' : 'visible'}
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
        onLayout={handleOnLayout}
        onContentSizeChange={handleContentSizeChange}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <HStack
          dangerouslySetStyle={styles.hStackContainer}
          spacing={0}
          justifyContent="space-between"
          spacingEnd={isOverflowing ? 2 : 0}
        >
          {periods.map((period) => (
            <SparklineInteractivePeriod
              key={period.value}
              period={period}
              handleOnLayout={getOnLayoutHandler}
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
  handleOnLayout,
  color,
}: SparklineInteractivePeriodProps<Period> & {
  handleOnLayout: (id: string) => ({ nativeEvent: { layout } }: LayoutChangeEvent) => void;
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
      onLayout={handleOnLayout(period.value)}
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
