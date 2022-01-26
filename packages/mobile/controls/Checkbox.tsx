import React, { forwardRef, memo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ControlBaseProps, useScale } from '@cbhq/cds-common';

import { Icon } from '../icons/Icon';
import * as scaleStyles from '../styles/scale';
import { Interactable } from '../system/Interactable';

import { Control, ControlIconProps, ControlProps } from './Control';

export type CheckboxProps<T extends string> = ControlBaseProps<T> & ControlProps<T>;

const CheckboxIcon: React.FC<ControlIconProps> = ({
  pressed,
  checked,
  disabled,
  animatedScaleValue,
  testID,
}) => {
  const cdsScale = useScale();
  const { checkboxSize } = scaleStyles[cdsScale].control;

  return (
    <Interactable
      testID={testID}
      pressed={pressed}
      backgroundColor={checked ? 'primary' : 'background'}
      borderColor={checked ? 'primary' : 'lineHeavy'}
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
      <Animated.View style={{ transform: [{ scale: animatedScaleValue }] }}>
        <Icon size="s" name="checkmark" color="primaryForeground" />
      </Animated.View>
    </Interactable>
  );
};

const CheckboxWithRef = forwardRef(function Checkbox<T extends string>(
  { children, ...props }: CheckboxProps<T>,
  ref: React.ForwardedRef<View>,
) {
  return (
    <Control<T>
      {...props}
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
