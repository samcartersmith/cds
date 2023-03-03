import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { CollapsibleBaseProps } from '@cbhq/cds-common';
import {
  animateInMaxSizeConfig,
  animateInOpacityConfig,
  animateOutMaxSizeConfig,
  animateOutOpacityConfig,
} from '@cbhq/cds-common/animation/collapsible';

import { useContentSize } from '../hooks/useContentSize';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { convertMotionConfigs } from '../motion/convertMotionConfig';
import { withMotionTiming } from '../motion/withMotionTiming';

const ReanimatedView = Animated.createAnimatedComponent(View);

export type CollapsibleProps = CollapsibleBaseProps & {
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
        direction = 'vertical',
        maxHeight,
        maxWidth,
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
      }: CollapsibleProps,
      forwardedRef: ForwardedRef<View>,
    ) => {
      const [{ height: contentHeight, width: contentWidth }, handleContentSizeChange] =
        useContentSize();
      const [animateInMaxSize, animateOutMaxSize, animateInOpacity, animateOutOpacity] =
        convertMotionConfigs([
          animateInMaxSizeConfig[direction],
          animateOutMaxSizeConfig[direction],
          animateInOpacityConfig[direction],
          animateOutOpacityConfig[direction],
        ]);

      const heightAnimatedValue = useSharedValue(animateInMaxSize.fromValue);
      const opacityAnimatedValue = useSharedValue(animateInOpacity.fromValue);

      const spacingStyles = useSpacingStyles({
        spacing,
        spacingBottom,
        spacingEnd,
        spacingHorizontal,
        spacingStart,
        spacingTop,
        spacingVertical,
      });

      // build props base on direction
      const { shouldEnableScroll, animateToSize, horizontal } = useMemo(() => {
        if (direction === 'vertical') {
          return {
            shouldEnableScroll: maxHeight ? contentHeight > maxHeight : false,
            animateToSize: maxHeight && maxHeight < contentHeight ? maxHeight : contentHeight,
            horizontal: false,
          };
        }

        return {
          shouldEnableScroll: maxWidth ? contentWidth > maxWidth : false,
          animateToSize: maxWidth && maxWidth < contentWidth ? maxWidth : contentWidth,
          horizontal: true,
        };
      }, [contentHeight, contentWidth, direction, maxHeight, maxWidth]);

      useAnimatedReaction(
        () => collapsed,
        (_collapsed, prevCollapsed) => {
          if (contentHeight === null) {
            return;
          }

          // skip initial animation if initial expanded
          const shouldSkipAnimation = !_collapsed && !prevCollapsed;

          heightAnimatedValue.value = shouldSkipAnimation
            ? animateToSize
            : withMotionTiming(
                _collapsed ? animateOutMaxSize : { ...animateInMaxSize, toValue: animateToSize },
              );

          opacityAnimatedValue.value = shouldSkipAnimation
            ? animateInOpacity.toValue
            : withMotionTiming(_collapsed ? animateOutOpacity : animateInOpacity);
        },
        [collapsed, contentHeight],
      );

      /*
       * The following code is to avoid doing computed property names inside the
       * useAnimatedStyle because it crashes:
       *
       * [animateInMaxSize.property]: heightAnimatedValue.value  // this crashes
       *
       * We created an issue in Reanimated about this.
       * https://github.com/software-mansion/react-native-reanimated/issues/4162
       * */
      const animatedInMaxSizeHeight = useAnimatedStyle(() => ({
        height: heightAnimatedValue.value,
      }));
      const animatedInMaxSizeWidth = useAnimatedStyle(() => ({ width: heightAnimatedValue.value }));
      const animatedInMaxSize =
        animateInMaxSize.property === 'height' ? animatedInMaxSizeHeight : animatedInMaxSizeWidth;
      const animatedStyles = useAnimatedStyle(() => ({
        opacity: Number(opacityAnimatedValue.value),
      }));

      const containerStyles = useMemo(
        () => [styles.container, animatedStyles, animatedInMaxSize],
        [animatedStyles, animatedInMaxSize],
      );
      return (
        <ReanimatedView
          testID={testID}
          style={containerStyles}
          ref={forwardedRef}
          aria-expanded={!collapsed}
        >
          <ScrollView
            horizontal={horizontal}
            scrollEnabled={shouldEnableScroll}
            onContentSizeChange={handleContentSizeChange}
            // for Android
            nestedScrollEnabled
            contentContainerStyle={spacingStyles}
            {...scrollViewProps}
          >
            {children}
          </ScrollView>
        </ReanimatedView>
      );
    },
  ),
);

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
});
