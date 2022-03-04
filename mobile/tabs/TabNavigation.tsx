import React, { useEffect, useCallback, useRef, useMemo, useState, memo, forwardRef } from 'react';
import {
  LayoutChangeEvent,
  ScrollView,
  View,
  LayoutRectangle,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { TabNavigationProps, TabProps } from '@cbhq/cds-common/types';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { PressableOpacity } from '../system/PressableOpacity';
import { TabIndicator } from './TabIndicator';
import { TabLabel } from './TabLabel';

type ScrollDetails = { xPosition: number; width: number };
type TabsLayoutsMap = Map<string, LayoutRectangle>;

const fallbackLayout: LayoutRectangle = { width: 0, x: 0, y: 0, height: 0 };

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabNavigation = memo(
  forwardRef<View, TabNavigationProps>(
    (
      { tabs, value = tabs[0].id, variant = 'primary', testID, onChange, ...rest },
      forwardedRef,
    ) => {
      const isDense = useScaleDensity() === 'dense';
      const isPrimary = useMemo(() => variant === 'primary', [variant]);
      const shouldOverrideScale = useMemo(() => isDense && isPrimary, [isDense, isPrimary]);
      const [activeTabLayout, setActiveTabLayout] = useState(fallbackLayout);
      const scrollRef = useRef<ScrollView>(null);
      const scrollDetails = useRef<ScrollDetails>({ xPosition: 0, width: 0 });
      const tabsLayoutsMap = useRef<TabsLayoutsMap>(new Map());

      const handleOnLayout = useCallback((event: LayoutChangeEvent) => {
        scrollDetails.current.width = event.nativeEvent.layout.width;
      }, []);

      const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollDetails.current.xPosition = event.nativeEvent.contentOffset.x;
      }, []);

      const handleActiveTabUpdate = useCallback((layout: LayoutRectangle) => {
        /** Set the active tab */
        setActiveTabLayout(layout);

        /** Check if active tab is offscreen and trigger a scroll event */
        const isOffscreenLeft = layout.x < scrollDetails.current?.xPosition;
        const isOffscreenRight =
          layout.x + layout.width - scrollDetails.current?.xPosition > scrollDetails.current?.width;
        const isOffscreen = isOffscreenLeft || isOffscreenRight;
        if (isOffscreen) {
          scrollRef.current?.scrollTo({ x: layout.x, animated: true });
        }
      }, []);

      const getOnLayoutHandler = useCallback(
        (id) => {
          return function onLayout({ nativeEvent: { layout } }: LayoutChangeEvent) {
            tabsLayoutsMap.current.set(id, layout);
            if (id === value) handleActiveTabUpdate(layout);
          };
        },
        [handleActiveTabUpdate, value],
      );

      const getTabPressHandler = useCallback(
        ({ id, onPress }: Pick<TabProps, 'id' | 'onPress'>) => {
          return function handleTabPress() {
            onChange?.(id);
            onPress?.(id); // handle callback
          };
        },
        [onChange],
      );

      /** ⚡️ Side effects 🛼
       *  We need to keep an eye on the value because
       *  we'll have to calculate everything and handle
       *  scroll and layout events whenever it updates
       */
      useEffect(() => {
        const layout = tabsLayoutsMap.current.get(value) ?? fallbackLayout;
        /** Set the active tab */
        handleActiveTabUpdate(layout);
      }, [value, handleActiveTabUpdate]);

      // Iterate over the tabs and create Pressable TabLabels
      const tabLabels = useMemo(
        () =>
          tabs.filter(Boolean).map(({ id, onPress, label, accessibilityLabel = label, count }) => {
            return (
              <View key={id} onLayout={getOnLayoutHandler(id)}>
                <PressableOpacity
                  accessibilityLabel={accessibilityLabel}
                  accessibilityHint={accessibilityLabel}
                  onPress={getTabPressHandler({ id, onPress })}
                >
                  <TabLabel active={id === value} variant={variant} count={count}>
                    {label}
                  </TabLabel>
                </PressableOpacity>
              </View>
            );
          }),
        [tabs, getOnLayoutHandler, getTabPressHandler, value, variant],
      );

      return (
        <Box testID={testID} overflow="gradient" ref={forwardedRef} {...rest}>
          <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            onScroll={handleScroll}
            onLayout={handleOnLayout}
          >
            <VStack>
              {shouldOverrideScale ? (
                <ScaleProvider value="large">
                  <HStack gap={4}>{tabLabels}</HStack>
                </ScaleProvider>
              ) : (
                <HStack gap={4}>{tabLabels}</HStack>
              )}
              {isPrimary && <TabIndicator x={activeTabLayout.x} width={activeTabLayout.width} />}
            </VStack>
          </ScrollView>
        </Box>
      );
    },
  ),
);

TabNavigation.displayName = 'TabNavigation';
