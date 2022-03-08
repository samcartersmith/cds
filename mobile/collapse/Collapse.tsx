import React, { memo, forwardRef, ForwardedRef, useMemo } from 'react';
import { ScrollView, View, Animated, ViewStyle } from 'react-native';
import type { CollapseBaseProps } from '@cbhq/cds-common/types';

import { useCollapseAnimation } from './useCollapseAnimation';
import { useCollapsibleAnimation } from './useCollapsibleAnimation';
import { useContentSize } from '../hooks/useContentSize';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { useCollapseDirection } from './useCollapseDirection';

export type CollapseProps = CollapseBaseProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Collapse = memo(
  forwardRef(
    (
      {
        children,
        expanded,
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

      const { shouldEnableScroll, animateTo, animateProperty, horizontal } = useCollapseDirection({
        direction,
        maxHeight,
        contentHeight,
        maxWidth,
        contentWidth,
      });

      const { animatedStyles, animateIn, animateOut } = useCollapseAnimation(
        expanded,
        animateTo,
        animateProperty,
      );
      useCollapsibleAnimation({ expanded, animateIn, animateOut });

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
