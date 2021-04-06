import React, { forwardRef, memo } from 'react';

import { useScale } from '@cbhq/cds-common';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import type { CheckboxBaseProps } from '@cbhq/cds-common/types/CheckboxBaseProps';
import { Animated, StyleSheet, View } from 'react-native';

import { usePalette } from '../hooks/usePalette';
import { Icon } from '../icons/Icon';
import { interactableStyles } from '../styles/interactable';
import * as scaleStyles from '../styles/scale';
import { InteractionOpacity } from '../system/InteractionOpacity';
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
    <InteractionOpacity pressed={pressed} backgroundColor={backgroundColor} disabled={disabled}>
      <Animated.View
        style={[
          styles.box,
          disabled && interactableStyles.disabled,
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
          {indeterminate ? (
            <Icon size="s" name="minus" color="primaryForeground" />
          ) : (
            <Icon size="s" name="checkmark" color="primaryForeground" />
          )}
        </Animated.View>
      </Animated.View>
    </InteractionOpacity>
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
    borderStyle: 'solid',
    borderWidth: borderWidth.checkbox,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
