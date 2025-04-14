import React, { forwardRef, memo, useMemo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ControlBaseProps } from '@cbhq/cds-common2';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Interactable } from '../system/Interactable';

import { Control, ControlIconProps, ControlProps } from './Control';

export type CheckboxProps<T extends string> = ControlBaseProps<T> & ControlProps<T>;

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
    const theme = useTheme();
    const { checkboxSize } = theme.controlSize;
    const backgroundColor = useMemo(() => {
      return checked || indeterminate ? 'bgPrimary' : 'bg';
    }, [checked, indeterminate]);

    const borderColor = useMemo(() => {
      // Checked/Indeterminate + Disabled buttons need a transparent border
      if (disabled) {
        return checked || indeterminate ? 'transparent' : 'bgLineHeavy';
      }

      return checked || indeterminate ? 'bgPrimary' : 'bgLineHeavy';
    }, [checked, indeterminate, disabled]);

    return (
      <Interactable
        background={backgroundColor}
        borderColor={borderColor}
        borderWidth={100}
        disabled={disabled}
        pressed={pressed}
        style={[
          styles.box,
          {
            width: checkboxSize,
            height: checkboxSize,
          },
        ]}
        testID={testID}
      >
        <Animated.View
          style={{ transform: [{ scale: animatedScaleValue }], opacity: animatedOpacityValue }}
        >
          <Icon color="fgInverse" name={checked ? 'checkmark' : 'minus'} size="s" />
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

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
