import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { TabNavigationProps, TabProps } from '@cbhq/cds-common/types';

import { useHorizontallyScrollingPressables } from '../hooks/useHorizontallyScrollingPressables';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { PressableOpacity } from '../system/PressableOpacity';

import { TabIndicator } from './TabIndicator';
import { TabLabel } from './TabLabel';

export const TabNavigation = memo(
  forwardRef<View, TabNavigationProps>(
    (
      {
        tabs,
        value = tabs[0].id,
        variant = 'primary',
        testID = 'tabNavigation',
        background = 'background',
        onChange,
        ...rest
      },
      forwardedRef,
    ) => {
      const isDense = useScaleDensity() === 'dense';
      const isPrimary = useMemo(() => variant === 'primary', [variant]);
      const shouldOverrideScale = useMemo(() => isDense && isPrimary, [isDense, isPrimary]);
      const [activeTabLayout, setActiveTabLayout] = useState({ width: 0, x: 0, y: 0, height: 0 });
      const {
        scrollRef,
        isScrollContentOverflowing,
        isScrollContentOffscreenRight,
        handleScroll,
        handleScrollContainerLayout,
        handleScrollContentSizeChange,
        getPressableLayoutHandler,
      } = useHorizontallyScrollingPressables(value, {
        setActivePressableLayout: setActiveTabLayout,
      });

      const getTabPressHandler = useCallback(
        ({ id, onPress }: Pick<TabProps, 'id' | 'onPress'>) => {
          return function handleTabPress() {
            onChange?.(id);
            onPress?.(id); // handle callback
          };
        },
        [onChange],
      );

      // Iterate over the tabs and create Pressable TabLabels
      const tabLabels = useMemo(
        () =>
          tabs
            .filter(Boolean)
            .map(
              ({
                id,
                onPress,
                label,
                accessibilityLabel = label,
                count,
                max,
                testID: tabLabelTestID = `${testID}-tabLabel--${id}`,
              }) => {
                return (
                  <View key={id} onLayout={getPressableLayoutHandler(id)}>
                    <PressableOpacity
                      transparentWhilePressed
                      accessibilityHint={accessibilityLabel}
                      accessibilityLabel={accessibilityLabel}
                      accessibilityRole="tab"
                      accessibilityState={{ selected: id === value }}
                      onPress={getTabPressHandler({ id, onPress })}
                      testID={tabLabelTestID}
                    >
                      <TabLabel active={id === value} count={count} max={max} variant={variant}>
                        {label}
                      </TabLabel>
                    </PressableOpacity>
                  </View>
                );
              },
            ),
        [tabs, testID, getPressableLayoutHandler, getTabPressHandler, value, variant],
      );

      return (
        <Box
          ref={forwardedRef}
          background={background}
          overflow={
            isScrollContentOverflowing && isScrollContentOffscreenRight ? 'gradient' : 'visible'
          }
          testID={testID}
          {...rest}
        >
          <ScrollView
            ref={scrollRef}
            horizontal
            accessibilityRole="tablist"
            onContentSizeChange={handleScrollContentSizeChange}
            onLayout={handleScrollContainerLayout}
            onScroll={handleScroll}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
          >
            <VStack>
              {shouldOverrideScale ? (
                <ScaleProvider value="large">
                  <HStack gap={4}>{tabLabels}</HStack>
                </ScaleProvider>
              ) : (
                <HStack gap={4}>{tabLabels}</HStack>
              )}
              {isPrimary && (
                <TabIndicator
                  background={background}
                  width={activeTabLayout.width}
                  x={activeTabLayout.x}
                />
              )}
            </VStack>
          </ScrollView>
        </Box>
      );
    },
  ),
);

TabNavigation.displayName = 'TabNavigation';
