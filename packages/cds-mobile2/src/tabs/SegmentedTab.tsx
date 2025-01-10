import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { useTabsContext } from '@cbhq/cds-common2/tabs/TabsContext';
import { type TabValue } from '@cbhq/cds-common2/tabs/useTabs';
import { borderRadius as borderRadii } from '@cbhq/cds-common2/tokens/borderRadius';
import { accessibleOpacityDisabled } from '@cbhq/cds-common2/tokens/interactable';

import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout';
import { TextHeadline } from '../typography';

import { tabsSpringConfig } from './Tabs';

export type SegmentedTabProps = {
  /**
   * Text color when the SegmentedTab is active.
   * @default negativeForeground
   */
  activeColor?: ThemeVars.Color;
  /**
   * Text color when the SegmentedTab is inactive.
   * @default foreground
   */
  color?: ThemeVars.Color;
  /** Callback that is fired when the SegmentedTab is pressed. */
  onPress?: (id: string, event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
} & TabValue &
  Omit<PressableProps, 'children' | 'disabled' | 'onPress' | 'style'>;

const AnimatedTextHeadline = Animated.createAnimatedComponent(TextHeadline);

export const SegmentedTab = memo(
  forwardRef(
    (
      {
        id,
        label,
        disabled: disabledProp,
        onPress,
        color = 'textForeground',
        activeColor = 'textForegroundInverse',
        style,
        'aria-selected': ariaSelected,
        accessibilityRole = 'button',
        testID,
        ...props
      }: SegmentedTabProps,
      ref: React.ForwardedRef<View>,
    ) => {
      const { activeTab, updateActiveTab, disabled: allTabsDisabled } = useTabsContext();
      const isActive = activeTab?.id === id;
      const isDisabled = disabledProp || allTabsDisabled;

      const handlePress = useCallback(
        (event: GestureResponderEvent) => {
          updateActiveTab(id);
          onPress?.(id, event);
        },
        [id, onPress, updateActiveTab],
      );

      const theme = useTheme();
      const activeColorRgbaString = theme.color[activeColor];
      const inactiveColorRgbaString = theme.color[color];
      const animatedColor = useSharedValue(
        isActive ? activeColorRgbaString : inactiveColorRgbaString,
      );

      animatedColor.value = withSpring(
        isActive ? activeColorRgbaString : inactiveColorRgbaString,
        tabsSpringConfig,
      );

      const animatedTextStyles = useAnimatedStyle(
        () => ({ color: animatedColor.value }),
        [animatedColor],
      );

      const pressableStyle = useMemo(
        () => ({
          borderRadius: borderRadii[1000],
          opacity: disabledProp && !allTabsDisabled ? accessibleOpacityDisabled : undefined,
        }),
        [disabledProp, allTabsDisabled],
      );

      return (
        <Pressable
          ref={ref}
          accessibilityRole={accessibilityRole}
          aria-selected={ariaSelected ?? isActive}
          disabled={isDisabled}
          onPress={handlePress}
          style={[pressableStyle, style]}
          testID={testID}
          {...props}
        >
          <Box alignItems="center" paddingX={2} paddingY={1}>
            {typeof label === 'string' ? (
              <AnimatedTextHeadline animated style={animatedTextStyles} testID={`${testID}-label`}>
                {label}
              </AnimatedTextHeadline>
            ) : (
              label
            )}
          </Box>
        </Pressable>
      );
    },
  ),
);

SegmentedTab.displayName = 'SegmentedTab';
