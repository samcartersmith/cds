import React, { forwardRef, memo, useMemo } from 'react';
import { AccessibilityProps, Animated, StyleSheet, View } from 'react-native';
import { SharedProps } from '@cbhq/cds-common2';
import type { ControlBaseProps } from '@cbhq/cds-common2/types/ControlBaseProps';
import type { RadioGroupBaseProps } from '@cbhq/cds-common2/types/RadioGroupBaseProps';
import { entries } from '@cbhq/cds-utils';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Group } from '../layout';
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
  const theme = useTheme();
  const { radioSize } = theme.controlSize;

  return (
    <Interactable
      background="bg"
      borderColor={checked ? 'bgPrimary' : 'bgLineHeavy'}
      borderRadius={1000}
      borderWidth={200}
      disabled={disabled}
      pressed={pressed}
      style={[
        styles.circle,
        {
          width: radioSize,
          height: radioSize,
        },
      ]}
      testID={testID}
    >
      <Animated.View
        style={{ transform: [{ scale: animatedScaleValue }], opacity: animatedOpacityValue }}
      >
        <Icon color="fgPrimary" name="dot" size="s" />
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
      accessibilityHint,
    }),
    [children, accessibilityLabel, accessibilityHint],
  );

  return (
    <Control<T>
      {...props}
      {...accessibilityProps}
      ref={ref}
      accessibilityRole="radio"
      hitSlop={5}
      label={children}
    >
      {RadioIcon}
    </Control>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(props: RadioProps<T> & { ref?: React.Ref<View> }) => React.ReactElement;

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
    value,
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
      accessibilityHint,
    }),
    [label, accessibilityLabel, accessibilityHint],
  );

  return (
    <Group
      ref={ref}
      accessibilityRole="radiogroup"
      testID={testID}
      {...accessibilityProps}
      {...restProps}
    >
      {label}
      {entries<Record<T, string | React.ReactNode>>(options).map(([optionValue, option]) => (
        <Radio<T>
          key={optionValue}
          accessibilityLabel={typeof option === 'string' ? option : undefined}
          checked={value === optionValue}
          onChange={onChange}
          testID={testID ? `${testID}-${optionValue}` : undefined}
          value={optionValue}
        >
          {option}
        </Radio>
      ))}
    </Group>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(
  props: RadioGroupProps<T> & { ref?: React.Ref<View> },
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
