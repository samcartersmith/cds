import React, { forwardRef, memo, useMemo } from 'react';
import { AccessibilityProps, Animated, StyleSheet, View } from 'react-native';
import { SharedProps, useScale } from '@cbhq/cds-common';
import type { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';
import type { RadioGroupBaseProps } from '@cbhq/cds-common/types/RadioGroupBaseProps';
import { entries } from '@cbhq/cds-utils';

import { Icon } from '../icons/Icon';
import { Group } from '../layout';
import * as scaleStyles from '../styles/scale';
import { Interactable } from '../system/Interactable';

import { Control, ControlIconProps, ControlProps } from './Control';

export type RadioProps<T extends string> = ControlBaseProps<T> & ControlProps<T>;

const RadioIcon: React.FC<React.PropsWithChildren<ControlIconProps>> = ({
  pressed,
  disabled,
  checked,
  animatedScaleValue,
  animatedOpacityValue,
  testID,
}) => {
  const cdsScale = useScale();
  const { radioSize } = scaleStyles[cdsScale].control;

  return (
    <Interactable
      testID={testID}
      pressed={pressed}
      backgroundColor="background"
      borderColor={checked ? 'primary' : 'lineHeavy'}
      borderRadius="roundedFull"
      borderWidth="radio"
      disabled={disabled}
      style={[
        styles.circle,
        {
          width: radioSize,
          height: radioSize,
        },
      ]}
    >
      <Animated.View
        style={{ transform: [{ scale: animatedScaleValue }], opacity: animatedOpacityValue }}
      >
        <Icon name="dot" size="s" color="primary" />
      </Animated.View>
    </Interactable>
  );
};

const RadioWithRef = forwardRef(function Radio<T extends string>(
  { children, accessibilityHint, accessibilityLabel, ...props }: RadioProps<T>,
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
      accessibilityRole="radio"
      label={children}
      ref={ref}
      hitSlop={5}
    >
      {RadioIcon}
    </Control>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(props: RadioProps<T> & React.RefAttributes<View>) => React.ReactElement;

// Make memoized function stay generic function type
export const Radio = memo(RadioWithRef) as typeof RadioWithRef &
  React.MemoExoticComponent<typeof RadioWithRef>;

export type RadioGroupProps<T extends string> = {
  /** Handle change event when pressing on a radio option. */
  onChange?: RadioProps<T>['onChange'];
} & Omit<AccessibilityProps, 'accessibilityLabelledBy'> &
  RadioGroupBaseProps<T> &
  SharedProps;

const RadioGroupWithRef = forwardRef(function RadioGroup<T extends string>(
  {
    label,
    selectedValue,
    onChange,
    options,
    testID,
    accessibilityLabel,
    accessibilityHint,
    ...restProps
  }: RadioGroupProps<T>,
  ref: React.ForwardedRef<View>,
) {
  const accessibilityProps = useMemo(
    () => ({
      accessibilityLabel:
        typeof label === 'string' && accessibilityLabel === undefined ? label : accessibilityLabel,
      accessibilityHint:
        typeof label === 'string' && accessibilityHint === undefined ? label : accessibilityHint,
    }),
    [label, accessibilityLabel, accessibilityHint],
  );

  return (
    <Group
      accessibilityRole="radiogroup"
      ref={ref}
      testID={testID}
      {...accessibilityProps}
      {...restProps}
    >
      {label}
      {entries<Record<T, string>>(options).map(([value, optionLabel]) => (
        <Radio<T>
          key={value}
          value={value}
          accessibilityLabel={optionLabel}
          accessibilityHint={optionLabel}
          checked={selectedValue === value}
          onChange={onChange}
          testID={testID ? `${testID}-${value}` : undefined}
        >
          {optionLabel}
        </Radio>
      ))}
    </Group>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(
  props: RadioGroupProps<T> & React.RefAttributes<View>,
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
