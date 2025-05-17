import React, { forwardRef, memo, useMemo } from 'react';
import { Animated, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Interactable } from '../system/Interactable';

import { Control, type ControlBaseProps, ControlIconProps } from './Control';

export type CheckboxBaseProps<T extends string> = ControlBaseProps<T>;

export type CheckboxProps<T extends string> = CheckboxBaseProps<T>;

const CheckboxIcon = memo(
  ({
    pressed,
    checked,
    indeterminate,
    disabled,
    animatedScaleValue,
    animatedOpacityValue,
    testID,
  }: React.PropsWithChildren<ControlIconProps>) => {
    const filled = checked || indeterminate;
    const theme = useTheme();
    const checkboxSize = theme.controlSize.checkboxSize;
    const iconPadding = checkboxSize / 5;
    const iconSize = checkboxSize - iconPadding;

    const animatedStyle = useMemo(
      () => ({ transform: [{ scale: animatedScaleValue }], opacity: animatedOpacityValue }),
      [animatedScaleValue, animatedOpacityValue],
    );

    const iconStyle = useMemo(
      () => ({
        icon: {
          width: iconSize,
          height: iconSize,
          fontSize: iconSize,
          lineHeight: iconSize,
          opacity: filled ? 1 : 0,
        } as const,
      }),
      [iconSize, filled],
    );

    return (
      <Interactable
        alignItems="center"
        background={filled ? 'bgPrimary' : 'bg'}
        borderColor={disabled && filled ? 'transparent' : filled ? 'bgPrimary' : 'bgLineHeavy'}
        borderWidth={100}
        disabled={disabled}
        height={checkboxSize}
        justifyContent="center"
        pressed={pressed}
        testID={testID}
        width={checkboxSize}
      >
        <Animated.View style={animatedStyle}>
          <Icon
            color="fgInverse"
            name={checked ? 'checkmark' : 'minus'}
            size="s"
            styles={iconStyle}
          />
        </Animated.View>
      </Interactable>
    );
  },
);

const CheckboxWithRef = forwardRef(function Checkbox<T extends string>(
  { children, accessibilityLabel, accessibilityHint, ...props }: CheckboxProps<T>,
  ref: React.ForwardedRef<View>,
) {
  const accessibilityLabelValue =
    typeof children === 'string' && accessibilityLabel === undefined
      ? children
      : accessibilityLabel;

  const accessibilityHintValue =
    typeof children === 'string' && accessibilityHint === undefined ? children : accessibilityHint;

  return (
    <Control<T>
      ref={ref}
      accessible
      accessibilityHint={accessibilityHintValue}
      accessibilityLabel={accessibilityLabelValue}
      accessibilityRole="switch"
      hitSlop={5}
      label={children}
      {...props}
    >
      {CheckboxIcon}
    </Control>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(props: CheckboxProps<T> & { ref?: React.Ref<View> }) => React.ReactElement;

// Make memoized function stay generic function type
export const Checkbox = memo(CheckboxWithRef) as typeof CheckboxWithRef &
  React.MemoExoticComponent<typeof CheckboxWithRef>;
