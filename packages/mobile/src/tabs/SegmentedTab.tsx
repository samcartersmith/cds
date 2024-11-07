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
import { PaletteForeground, useSpectrum } from '@cbhq/cds-common';
import { useTabsContext } from '@cbhq/cds-common/tabs/TabsContext';
import { type TabValue } from '@cbhq/cds-common/tabs/useTabs';
import { borderRadius as borderRadii } from '@cbhq/cds-common/tokens/borderRadius';
import { accessibleOpacityDisabled } from '@cbhq/cds-common/tokens/interactable';

import { Box } from '../layout';
import { TextHeadline } from '../typography';
import { paletteAliasToRgbaString } from '../utils/palette';

import { tabsSpringConfig } from './Tabs';

export type SegmentedTabProps = {
  /**
   * Text color when the SegmentedTab is active.
   * @default negativeForeground
   */
  activeColor?: PaletteForeground;
  /**
   * Text color when the SegmentedTab is inactive.
   * @default foreground
   */
  color?: PaletteForeground;
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
        color = 'foreground',
        activeColor = 'negativeForeground',
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

      const spectrum = useSpectrum();
      const activeColorRgbaString = paletteAliasToRgbaString(activeColor, spectrum);
      const inactiveColorRgbaString = paletteAliasToRgbaString(color, spectrum);
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
          borderRadius: borderRadii.roundedFull,
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
          <Box alignItems="center" spacingHorizontal={2} spacingVertical={1}>
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
