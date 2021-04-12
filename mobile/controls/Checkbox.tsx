import React, { forwardRef, memo } from 'react';

import { useScale } from '@cbhq/cds-common';
import type { CheckboxBaseProps } from '@cbhq/cds-common/types/CheckboxBaseProps';
import { Animated, StyleSheet, View } from 'react-native';

import { usePalette } from '../hooks/usePalette';
import { Icon } from '../icons/Icon';
import * as scaleStyles from '../styles/scale';
import { Interactable } from '../system/Interactable';
import { Control, ControlIconProps, ControlProps } from './Control';

export interface CheckboxProps<T extends string>
  extends CheckboxBaseProps<T>,
    Omit<ControlProps<T>, 'label' | 'children'> {}

const CheckboxIcon: React.FC<ControlIconProps> = ({
  pressed,
  disabled,
  backgroundColor,
  animatedBoxValue,
  animatedScaleValue,
  indeterminate,
}) => {
  const palette = usePalette();
  const cdsScale = useScale();
  const { checkboxSize } = scaleStyles[cdsScale].control;

  return (
    <Interactable
      pressed={pressed}
      backgroundColor={backgroundColor}
      borderColor="lineHeavy"
      borderWidth="checkbox"
      disabled={disabled}
      style={[
        styles.box,
        {
          borderColor: animatedBoxValue.interpolate({
            inputRange: [0, 1],
            outputRange: [palette.lineHeavy, palette.primary],
          }),
          backgroundColor: animatedBoxValue.interpolate({
            inputRange: [0, 1],
            outputRange: [palette.background, palette.primary],
          }),
          width: checkboxSize,
          height: checkboxSize,
        },
      ]}
    >
      <Animated.View style={{ transform: [{ scale: animatedScaleValue }] }}>
        <Icon size="s" name={indeterminate ? 'minus' : 'checkmark'} color="primaryForeground" />
      </Animated.View>
    </Interactable>
  );
};

const CheckboxWithRef = forwardRef(function Checkbox<T extends string>(
  { children, ...props }: CheckboxProps<T>,
  ref: React.ForwardedRef<View>
) {
  return (
    <Control<T> {...props} accessible accessibilityRole="checkbox" label={children} ref={ref}>
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
