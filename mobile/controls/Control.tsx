import React, { forwardRef, memo, useCallback, useEffect, useRef } from 'react';

import { opacityPressed } from '@cbhq/cds-common/tokens/interactableOpacity';
import { isDevelopment } from '@cbhq/cds-utils';
import {
  AccessibilityActionEvent,
  Animated,
  I18nManager,
  Keyboard,
  Pressable,
  PressableProps,
  View,
} from 'react-native';

import { usePalette } from '../hooks/usePalette';
import { InteractionOpacityProps } from '../system/InteractionOpacity';
import { TextProps } from '../typography/createText';
import { TextBody } from '../typography/TextBody';
import { Haptics } from '../utils/haptics';

export type ControlIconProps = {
  pressed: boolean;
  disabled?: boolean;
  backgroundColor: InteractionOpacityProps['backgroundColor'];
  animatedBoxValue: Animated.Value;
  animatedScaleValue: Animated.Value;
  indeterminate?: boolean;
};

export interface ControlProps<T extends string>
  extends Omit<PressableProps, 'disabled' | 'children' | 'style'> {
  checked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  indeterminate?: boolean;
  /** Label associated with the multiple choice option control. */
  label?: TextProps['children'];
  testID?: string;
  onChange?: (value?: T) => void;
  value?: T;
  /** Control icon to show. */
  children: React.ComponentType<ControlIconProps>;
}

const ControlWithRef = forwardRef(function ControlWithRef<T extends string>(
  {
    testID,
    label,
    checked,
    disabled = false,
    readOnly = false,
    indeterminate,
    onChange,
    hitSlop = 4,
    value,
    accessibilityRole,
    accessibilityLabel,
    accessibilityHint,
    children: ControlIcon,
    ...props
  }: ControlProps<T>,
  ref: React.ForwardedRef<View>
) {
  if (isDevelopment() && !label && !accessibilityLabel) {
    console.warn(
      `Please specify an accessibility label for the ${accessibilityRole} control with value ${value}.`
    );
  }

  const palette = usePalette();

  // TODO: create a custom hook to initialize animated values so that they are not called on every render
  const animatedBoxValue = useRef(new Animated.Value(0)).current;
  const animatedScaleValue = useRef(new Animated.Value(0.1)).current; /* android needs 0.1 */
  const filled = checked || indeterminate;
  const pressDisabled = disabled || readOnly;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedBoxValue, {
        toValue: filled ? 1 : 0,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.spring(animatedScaleValue, {
        toValue: filled ? 1 : 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [filled, animatedBoxValue, animatedScaleValue]);

  const handlePress = useCallback(() => {
    Haptics.lightImpact();
    onChange?.(value);
    Keyboard.dismiss();
  }, [onChange, value]);

  const controlIconProps = {
    backgroundColor: filled ? ('primary' as const) : ('background' as const),
    disabled: pressDisabled,
    animatedBoxValue,
    animatedScaleValue,
    indeterminate,
  };

  return (
    <Pressable
      ref={ref}
      disabled={pressDisabled}
      testID={testID}
      accessible
      accessibilityState={{
        disabled: pressDisabled,
        checked: indeterminate ? ('mixed' as const) : checked,
      }}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityActions={[{ name: 'activate' }]}
      onAccessibilityAction={useCallback(
        (event: AccessibilityActionEvent) => {
          if (event.nativeEvent.actionName === 'activate') {
            handlePress();
          }
        },
        [handlePress]
      )}
      style={{
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
      }}
      hitSlop={hitSlop}
      onPress={handlePress}
      {...props}
    >
      {({ pressed }) => (
        <>
          <ControlIcon {...controlIconProps} pressed={pressed} />
          {label && (
            <TextBody
              testID={`${testID}Label`}
              animated
              dangerouslySetStyle={{
                color: animatedBoxValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [palette.foregroundMuted, palette.foreground],
                }),
                // Simplify to use opacity for default palette foreground color (i.e. gray100) hue step
                opacity: pressed ? opacityPressed[100] : 1,
              }}
              spacingStart={1}
              color={checked ? 'foreground' : 'foregroundMuted'}
            >
              {label}
            </TextBody>
          )}
        </>
      )}
    </Pressable>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(props: ControlProps<T> & React.RefAttributes<View>) => React.ReactElement;

// Make memoized function stay generic function type
export const Control = memo(ControlWithRef) as typeof ControlWithRef &
  React.MemoExoticComponent<typeof ControlWithRef>;
