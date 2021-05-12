import React, { forwardRef, memo } from 'react';

import { SharedProps, useScale } from '@cbhq/cds-common';
import type { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';
import type { RadioGroupBaseProps } from '@cbhq/cds-common/types/RadioGroupBaseProps';
import { entries } from '@cbhq/cds-utils';
import { AccessibilityProps, Animated, StyleSheet, View } from 'react-native';

import { usePalette } from '../hooks/usePalette';
import { Icon } from '../icons/Icon';
import * as scaleStyles from '../styles/scale';
import { Interactable } from '../system/Interactable';
import { Control, ControlIconProps, ControlProps } from './Control';

export interface RadioProps<T extends string> extends ControlBaseProps<T>, ControlProps<T> {}

const RadioIcon: React.FC<ControlIconProps> = ({
  pressed,
  disabled,
  backgroundColor,
  animatedBoxValue,
  animatedScaleValue,
  testID,
}) => {
  const palette = usePalette();
  const cdsScale = useScale();
  const { radioSize } = scaleStyles[cdsScale].control;

  return (
    <Interactable
      testID={testID}
      pressed={pressed}
      backgroundColor="background"
      borderColor="lineHeavy"
      borderRadius="round"
      borderWidth="radio"
      disabled={disabled}
      style={[
        styles.circle,
        {
          borderColor: animatedBoxValue.interpolate({
            inputRange: [0, 1],
            outputRange: [palette.lineHeavy, palette.primary],
          }),
          backgroundColor,
          width: radioSize,
          height: radioSize,
        },
      ]}
    >
      <Animated.View style={{ transform: [{ scale: animatedScaleValue }] }}>
        <Icon name="dot" size="s" color="primary" />
      </Animated.View>
    </Interactable>
  );
};

const RadioWithRef = forwardRef(function Radio<T extends string>(
  { children, ...props }: RadioProps<T>,
  ref: React.ForwardedRef<View>
) {
  return (
    <Control<T> {...props} accessibilityRole="radio" label={children} ref={ref} hitSlop={5}>
      {RadioIcon}
    </Control>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(props: RadioProps<T> & React.RefAttributes<View>) => React.ReactElement;

// Make memoized function stay generic function type
export const Radio = memo(RadioWithRef) as typeof RadioWithRef &
  React.MemoExoticComponent<typeof RadioWithRef>;

export interface RadioGroupProps<T extends string>
  extends AccessibilityProps,
    RadioGroupBaseProps<T>,
    SharedProps {
  /** Handle change event when pressing on a radio option. */
  onChange?: RadioProps<T>['onChange'];
}

const RadioGroupWithRef = forwardRef(function RadioGroup<T extends string>(
  { label, selectedValue, onChange, options, testID, ...restProps }: RadioGroupProps<T>,
  ref: React.ForwardedRef<View>
) {
  return (
    <View accessibilityRole="radiogroup" ref={ref} testID={testID} {...restProps}>
      {label}
      {entries<RadioGroupProps<T>['options']>(options).map(([value, optionLabel]) => (
        <Radio<T>
          key={value}
          value={value}
          checked={selectedValue === value}
          onChange={onChange}
          testID={testID ? `${testID}-${value}` : undefined}
        >
          {optionLabel}
        </Radio>
      ))}
    </View>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(
  props: RadioGroupProps<T> & React.RefAttributes<View>
) => React.ReactElement;

// Make memoized function stay generic function type
export const RadioGroup = memo(RadioGroupWithRef) as typeof RadioGroupWithRef &
  React.MemoExoticComponent<typeof RadioGroupWithRef>;

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
