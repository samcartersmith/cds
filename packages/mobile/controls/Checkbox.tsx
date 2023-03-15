import React, { forwardRef, memo, useMemo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ControlBaseProps, useScale } from '@cbhq/cds-common';

import { Icon } from '../icons/Icon';
import * as scaleStyles from '../styles/scale';
import { Interactable } from '../system/Interactable';

import { Control, ControlIconProps, ControlProps } from './Control';

export type CheckboxProps<T extends string> = ControlBaseProps<T> & ControlProps<T>;

const CheckboxIcon = memo(
  ({
    pressed,
    checked,
    disabled,
    animatedScaleValue,
    animatedOpacityValue,
    testID,
  }: ControlIconProps) => {
    const cdsScale = useScale();
    const { checkboxSize } = scaleStyles[cdsScale].control;
    const backgroundColor = useMemo(() => {
      return checked ? 'primary' : 'background';
    }, [checked]);

    const borderColor = useMemo(() => {
      // Checked + Disabled buttons need a transparent border
      if (disabled) {
        return checked ? 'transparent' : 'lineHeavy';
      }

      return checked ? 'primary' : 'lineHeavy';
    }, [checked, disabled]);

    return (
      <Interactable
        testID={testID}
        pressed={pressed}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderWidth="checkbox"
        disabled={disabled}
        style={[
          styles.box,
          {
            width: checkboxSize,
            height: checkboxSize,
          },
        ]}
      >
        <Animated.View
          style={{ transform: [{ scale: animatedScaleValue }], opacity: animatedOpacityValue }}
        >
          <Icon size="s" name="checkmark" color="primaryForeground" />
        </Animated.View>
      </Interactable>
    );
  },
);

const CheckboxWithRef = forwardRef(function Checkbox<T extends string>(
  { children, accessibilityLabel, accessibilityHint, ...props }: CheckboxProps<T>,
  ref: React.ForwardedRef<View>,
) {
  const accessibilityProps = useMemo(
    () => ({
      accessibilityLabel:
        typeof children === 'string' && accessibilityLabel === undefined
          ? children
          : accessibilityLabel,
      accessibilityHint:
        typeof children === 'string' && accessibilityHint === undefined
          ? children
          : accessibilityHint,
    }),
    [children, accessibilityLabel, accessibilityHint],
  );

  return (
    <Control<T>
      {...props}
      {...accessibilityProps}
      accessible
      accessibilityRole="switch"
      label={children}
      ref={ref}
      hitSlop={5}
    >
      {CheckboxIcon}
    </Control>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(props: CheckboxProps<T> & React.RefAttributes<View>) => React.ReactElement;

// Make memoized function stay generic function type
export const Checkbox = memo(CheckboxWithRef) as typeof CheckboxWithRef &
  React.MemoExoticComponent<typeof CheckboxWithRef>;

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
