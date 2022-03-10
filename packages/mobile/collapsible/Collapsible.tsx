import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { Animated, ScrollView, View, ViewStyle } from 'react-native';
import type { CollapsibleBaseProps } from '@cbhq/cds-common/types';

import { useContentSize } from '../hooks/useContentSize';
import { useSpacingStyles } from '../hooks/useSpacingStyles';

import { useCollapsibleAnimation } from './useCollapsibleAnimation';
import { useCollapsibleDirection } from './useCollapsibleDirection';
import { useToggleAnimation } from './useToggleAnimation';

export type CollapseProps = CollapsibleBaseProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Collapsible = memo(
  forwardRef(
    (
      {
        children,
        collapsed = true,
        maxHeight,
        maxWidth,
        direction = 'vertical',
        testID,
        // Spacing
        spacing,
        spacingBottom,
        spacingEnd,
        spacingHorizontal,
        spacingStart,
        spacingTop,
        spacingVertical,
      }: CollapseProps,
      forwardedRef: ForwardedRef<View>,
    ) => {
      const [{ height: contentHeight, width: contentWidth }, handleContentSizeChange] =
        useContentSize();
      const { paddingTop, ...restPadding } = useSpacingStyles({
        spacing,
        spacingBottom,
        spacingEnd,
        spacingHorizontal,
        spacingStart,
        spacingTop,
        spacingVertical,
      });

      const { shouldEnableScroll, animateTo, animateProperty, horizontal } =
        useCollapsibleDirection({
          direction,
          maxHeight,
          contentHeight,
          maxWidth,
          contentWidth,
        });

      const { animatedStyles, animateIn, animateOut } = useCollapsibleAnimation(
        collapsed,
        animateTo,
        animateProperty,
      );
      useToggleAnimation({ on: !collapsed, animateIn, animateOut });

      const scrollViewStyles = useMemo(
        () => ({
          marginTop: paddingTop,
        }),
        [paddingTop],
      );

      const containerStyles = useMemo(
        () =>
          [animatedStyles, { flexDirection: horizontal ? 'row' : 'column', flex: 1 }] as ViewStyle,
        [animatedStyles, horizontal],
      );

      return (
        <Animated.View testID={testID} style={containerStyles} ref={forwardedRef}>
          <ScrollView
            horizontal={horizontal}
            scrollEnabled={shouldEnableScroll}
            onContentSizeChange={handleContentSizeChange}
            // for Android
            nestedScrollEnabled
            style={scrollViewStyles}
            contentContainerStyle={restPadding}
          >
            {children}
          </ScrollView>
        </Animated.View>
      );
    },
  ),
);
