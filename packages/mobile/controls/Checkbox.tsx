import React, { forwardRef, memo, PropsWithChildren, useMemo } from 'react';
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
    indeterminate,
    disabled,
    animatedScaleValue,
    animatedOpacityValue,
    testID,
  }: PropsWithChildren<ControlIconProps>) => {
    const cdsScale = useScale();
    const { checkboxSize } = scaleStyles[cdsScale].control;
    const backgroundColor = useMemo(() => {
      return checked || indeterminate ? 'primary' : 'background';
    }, [checked, indeterminate]);

    const borderColor = useMemo(() => {
      // Checked/Indeterminate + Disabled buttons need a transparent border
      if (disabled) {
        return checked || indeterminate ? 'transparent' : 'lineHeavy';
      }

      return checked || indeterminate ? 'primary' : 'lineHeavy';
    }, [checked, indeterminate, disabled]);

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
          <Icon size="s" name={checked ? 'checkmark' : 'minus'} color="primaryForeground" />
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
      accessible
      accessibilityRole="switch"
      hitSlop={5}
      {...props}
      {...accessibilityProps}
      label={children}
      ref={ref}
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
