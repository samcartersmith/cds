import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  AccessibilityActionEvent,
  Animated,
  I18nManager,
  Keyboard,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  View,
  ViewStyle,
} from 'react-native';
import { SharedProps } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { accessibleOpacityDisabled, opacityPressed } from '@cbhq/cds-common2/tokens/interactable';
import { ControlBaseProps } from '@cbhq/cds-common2/types/ControlBaseProps';
import { isDevelopment } from '@cbhq/cds-utils';

import { useTheme } from '../hooks/useTheme';
import { Text, TextProps } from '../typography/Text';
import { Haptics } from '../utils/haptics';

import { useControlMotionProps } from './useControlMotionProps';

export type ControlIconProps = {
  pressed: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  backgroundColor: ThemeVars.Color;
  animatedScaleValue: Animated.Value;
  animatedOpacityValue: Animated.Value;
} & SharedProps;

export type ControlProps<T extends string> = {
  /** Toggle control selected state. */
  onChange?: (value?: T) => void;
  style?: ViewStyle;
} & Omit<PressableProps, 'disabled' | 'children' | 'style'> &
  Omit<ControlBaseProps<T>, 'children'>;

type ControlInternalProps<T extends string> = {
  /** Control icon to show. */
  children: React.ComponentType<React.PropsWithChildren<ControlIconProps>>;
  /** Label associated with the multiple choice option control. */
  label?: TextProps['children'];
  /** If control is a switch. This will use switch motion token. */
  shouldUseSwitchTransition?: boolean;
} & ControlProps<T>;

const ControlWithRef = forwardRef(function ControlWithRef<T extends string>(
  {
    testID,
    label,
    checked,
    indeterminate,
    disabled = false,
    readOnly = false,
    onChange,
    hitSlop = 4,
    value,
    accessibilityRole,
    accessibilityLabel,
    accessibilityHint,
    children: ControlIcon,
    shouldUseSwitchTransition,
    style,
    ...props
  }: ControlInternalProps<T>,
  ref: React.ForwardedRef<View>,
) {
  const theme = useTheme();

  if (isDevelopment() && props.accessible && !label && !accessibilityLabel) {
    console.warn(
      `Please specify an accessibility label for the ${accessibilityRole} control with value ${value}.`,
    );
  }

  const bodyLineHeight = theme.lineHeight.body;
  const isMounted = useRef(false);

  const { animation, animatedBoxValue, animatedScaleValue, animatedOpacityValue } =
    useControlMotionProps({
      checked: checked || indeterminate,
      disabled,
      shouldUseSwitchTransition,
    });

  const pressDisabled = disabled || readOnly;

  useEffect(() => {
    if (isMounted.current) {
      animation.start();
    } else {
      isMounted.current = true;
    }
  }, [checked, indeterminate, animation]);

  const handlePress = useCallback(() => {
    void Haptics.lightImpact();
    onChange?.(value);
    Keyboard.dismiss();
  }, [onChange, value]);

  const controlIconProps = {
    checked,
    indeterminate,
    backgroundColor: checked || indeterminate ? ('bgPrimary' as const) : ('bg' as const),
    disabled: pressDisabled,
    animatedScaleValue,
    animatedOpacityValue,
    testID,
  };

  const iconWrapperStyles: ViewStyle = useMemo(
    () => ({
      height: bodyLineHeight,
      justifyContent: 'center',
    }),
    [bodyLineHeight],
  );

  const pressableStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      alignItems: 'flex-start',
      gap: theme.space[1],
      ...style,
    }),
    [theme.space, style],
  );

  const getLabelStyle = useCallback(
    (state: PressableStateCallbackType) => {
      return {
        color: animatedBoxValue.interpolate({
          inputRange: [0, 1],
          outputRange: [theme.color.fgMuted, theme.color.fg],
        }),
        // Prevent text element from expanding beyond available width.
        flexShrink: 1,
        opacity: state.pressed ? opacityPressed : pressDisabled ? accessibleOpacityDisabled : 1,
      };
    },
    [animatedBoxValue, pressDisabled, theme.color.fg, theme.color.fgMuted],
  );

  return (
    <Pressable
      ref={ref}
      accessible
      accessibilityActions={[{ name: 'activate' }]}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        disabled: pressDisabled,
        checked: Boolean(checked || indeterminate),
      }}
      disabled={pressDisabled}
      hitSlop={hitSlop}
      onAccessibilityAction={useCallback(
        (event: AccessibilityActionEvent) => {
          if (event.nativeEvent.actionName === 'activate') {
            handlePress();
          }
        },
        [handlePress],
      )}
      onPress={handlePress}
      style={pressableStyle}
      {...props}
    >
      {({ pressed }) =>
        // If the control has label, the label's lineHeight doesn't match the icon size. We need to wrap the icon with a container that match the lineHeight of the label typography and center the icon inside the wrapper so that the icon will be aligned properly with the first line of the label text.
        label ? (
          <>
            <View style={iconWrapperStyles}>
              <ControlIcon {...controlIconProps} pressed={pressed} />
            </View>
            <Text
              animated
              color={checked || indeterminate ? 'fg' : 'fgMuted'}
              font="body"
              style={getLabelStyle({ pressed })}
              testID={`${testID}Label`}
            >
              {label}
            </Text>
          </>
        ) : (
          <ControlIcon {...controlIconProps} pressed={pressed} />
        )
      }
    </Pressable>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(
  props: ControlInternalProps<T> & { ref?: React.Ref<View> },
) => React.ReactElement;

// Make memoized function stay generic function type
export const Control = memo(ControlWithRef) as typeof ControlWithRef &
  React.MemoExoticComponent<typeof ControlWithRef>;
