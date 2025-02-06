import React, { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TabNavigationProps, TabProps } from '@cbhq/cds-common2/types';
import { isDevelopment } from '@cbhq/cds-utils';

import { useHorizontallyScrollingPressables } from '../hooks/useHorizontallyScrollingPressables';
import { OverflowGradient } from '../layout';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Pressable } from '../system/Pressable';

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
        background = 'bg',
        onChange,
        Component,
        gap = 4,
        role = 'tablist',
        ...rest
      },
      forwardedRef,
    ) => {
      const isPrimary = useMemo(() => variant === 'primary', [variant]);
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
      const descendantAriaRole = role === 'tablist' ? 'tab' : 'radio';

      const getTabPressHandler = useCallback(
        ({ id, onPress }: Pick<TabProps, 'id' | 'onPress'>) => {
          return function handleTabPress() {
            onChange?.(id);
            onPress?.(id); // handle callback
          };
        },
        [onChange],
      );

      useEffect(() => {
        if (isDevelopment() && variant === 'secondary') {
          // eslint-disable-next-line no-console
          console.warn(
            'Deprecation Warning: Secondary tabs are deprecated, please migrate to primary tabs. In the case of nested tabs, consider using TabbedChips',
          );
        }
      }, [variant]);

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
                disabled,
                accessibilityLabel = label,
                count,
                max,
                testID: tabLabelTestID = `${testID}-tabLabel--${id}`,
                Component: TabComponent,
              }) => {
                const isActiveTab = id === value;
                const a11yLabelToString =
                  typeof accessibilityLabel === 'string' ? accessibilityLabel : undefined;
                const a11yState =
                  role === 'radiogroup' ? { checked: isActiveTab } : { selected: isActiveTab };

                const CustomTabComponent = TabComponent ?? Component;

                return (
                  <View key={id} onLayout={getPressableLayoutHandler(id)}>
                    <Pressable
                      transparentWhilePressed
                      accessibilityHint={a11yLabelToString}
                      accessibilityLabel={a11yLabelToString}
                      accessibilityRole={descendantAriaRole}
                      accessibilityState={a11yState}
                      background="transparent"
                      disabled={disabled}
                      onPress={getTabPressHandler({ id, onPress })}
                      testID={tabLabelTestID}
                    >
                      {CustomTabComponent ? (
                        <CustomTabComponent active={isActiveTab} id={id} label={label} />
                      ) : (
                        <TabLabel active={id === value} count={count} max={max} variant={variant}>
                          {label}
                        </TabLabel>
                      )}
                    </Pressable>
                  </View>
                );
              },
            ),
        [
          tabs,
          testID,
          value,
          role,
          Component,
          getPressableLayoutHandler,
          descendantAriaRole,
          getTabPressHandler,
          variant,
        ],
      );

      return (
        <Box
          ref={forwardedRef}
          background={background}
          overflow={
            isScrollContentOverflowing && isScrollContentOffscreenRight ? undefined : 'visible'
          }
          testID={testID}
          {...rest}
        >
          <ScrollView
            ref={scrollRef}
            horizontal
            accessibilityRole={role}
            onContentSizeChange={handleScrollContentSizeChange}
            onLayout={handleScrollContainerLayout}
            onScroll={handleScroll}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
          >
            <VStack>
              <HStack gap={gap}>{tabLabels}</HStack>
              {isPrimary && (
                <TabIndicator
                  background={background}
                  width={activeTabLayout.width}
                  x={activeTabLayout.x}
                />
              )}
            </VStack>
          </ScrollView>
          {isScrollContentOverflowing && isScrollContentOffscreenRight ? (
            <OverflowGradient />
          ) : null}
        </Box>
      );
    },
  ),
);

TabNavigation.displayName = 'TabNavigation';
