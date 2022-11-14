import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  AccessibilityActionEvent,
  Animated,
  I18nManager,
  Keyboard,
  Pressable,
  PressableProps,
  View,
  ViewStyle,
} from 'react-native';
import { PaletteBackground, SharedProps } from '@cbhq/cds-common';
import { opacityPressed } from '@cbhq/cds-common/tokens/interactable';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';
import { isDevelopment } from '@cbhq/cds-utils';

import { usePalette } from '../hooks/usePalette';
import { Spacer } from '../layout/Spacer';
import { TextProps } from '../typography/createText';
import { TextBody } from '../typography/TextBody';
import { useLineHeight } from '../typography/useLineHeight';
import { Haptics } from '../utils/haptics';

import { useControlMotionProps } from './useControlMotionProps';

export type ControlIconProps = {
  pressed: boolean;
  checked?: boolean;
  disabled?: boolean;
  backgroundColor: PaletteBackground;
  animatedScaleValue: Animated.Value;
  animatedOpacityValue: Animated.Value;
} & SharedProps;

export type ControlProps<T extends string> = {
  /** Toggle control selected state. */
  onChange?: (value?: T) => void;
} & Omit<PressableProps, 'disabled' | 'children' | 'style'> &
  ControlBaseProps<T>;

type ControlInternalProps<T extends string> = {
  /** Control icon to show. */
  children: React.ComponentType<ControlIconProps>;
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
    ...props
  }: ControlInternalProps<T>,
  ref: React.ForwardedRef<View>,
) {
  if (isDevelopment() && !label && !accessibilityLabel) {
    // eslint-disable-next-line no-console
    console.warn(
      `Please specify an accessibility label for the ${accessibilityRole} control with value ${value}.`,
    );
  }

  const palette = usePalette();
  const bodyLineHeight = useLineHeight('body');
  const isMounted = useRef(false);

  const { animation, animatedBoxValue, animatedScaleValue, animatedOpacityValue } =
    useControlMotionProps({ checked, disabled, shouldUseSwitchTransition });

  const pressDisabled = disabled || readOnly;

  useEffect(() => {
    if (isMounted.current) {
      animation.start();
    } else {
      isMounted.current = true;
    }
  }, [checked, animation]);

  const handlePress = useCallback(() => {
    void Haptics.lightImpact();
    onChange?.(value);
    Keyboard.dismiss();
  }, [onChange, value]);

  const controlIconProps = {
    checked,
    backgroundColor: checked ? ('primary' as const) : ('background' as const),
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

  return (
    <Pressable
      ref={ref}
      disabled={pressDisabled}
      accessible
      accessibilityState={{
        disabled: pressDisabled,
        checked,
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
        [handlePress],
      )}
      style={{
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
      }}
      hitSlop={hitSlop}
      onPress={handlePress}
      {...props}
    >
      {({ pressed }) =>
        // If the control has label, the label's lineHeight doesn't match the icon size. We need to wrap the icon with a container that match the lineHeight of the label typography and center the icon inside the wrapper so that the icon will be aligned properly with the first line of the label text.
        label ? (
          <>
            <View style={iconWrapperStyles}>
              <ControlIcon {...controlIconProps} pressed={pressed} />
            </View>
            <Spacer horizontal={1} />
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
                // Prevent text element from expanding beyond available width.
                flexShrink: 1,
              }}
              color={checked ? 'foreground' : 'foregroundMuted'}
            >
              {label}
            </TextBody>
          </>
        ) : (
          <ControlIcon {...controlIconProps} pressed={pressed} />
        )
      }
    </Pressable>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(
  props: ControlInternalProps<T> & React.RefAttributes<View>,
) => React.ReactElement;

// Make memoized function stay generic function type
export const Control = memo(ControlWithRef) as typeof ControlWithRef &
  React.MemoExoticComponent<typeof ControlWithRef>;
