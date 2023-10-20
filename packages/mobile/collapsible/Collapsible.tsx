import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { Animated, ScrollView, ScrollViewProps, View, ViewStyle } from 'react-native';
import type { CollapsibleBaseProps } from '@cbhq/cds-common/types';

import { useContentSize } from '../hooks/useContentSize';
import { useSpacingStyles } from '../hooks/useSpacingStyles';

import { useCollapsibleAnimation } from './useCollapsibleAnimation';
import { useCollapsibleDirection } from './useCollapsibleDirection';
import { useToggleAnimation } from './useToggleAnimation';

export type CollapseProps = CollapsibleBaseProps & {
  /**
   * RN ScrollView props. Use with caution as it might break default settings.
   */
  scrollViewProps?: ScrollViewProps;
  /**
   * Max height of the content. Overflow content will be scrollable.
   */
  maxHeight?: number;
  /**
   * Max width of the content. Overflow content will be scrollable.
   */
  maxWidth?: number;
};

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
        scrollViewProps,
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

      const { animatedStyles, animateIn, animateOut } = useCollapsibleAnimation({
        collapsed,
        animateTo,
        animateProperty,
        direction,
      });
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
        <Animated.View
          ref={forwardedRef}
          aria-expanded={!collapsed}
          style={containerStyles}
          testID={testID}
        >
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={restPadding}
            horizontal={horizontal}
            onContentSizeChange={handleContentSizeChange}
            scrollEnabled={shouldEnableScroll}
            style={scrollViewStyles}
            {...scrollViewProps}
          >
            {children}
          </ScrollView>
        </Animated.View>
      );
    },
  ),
);
