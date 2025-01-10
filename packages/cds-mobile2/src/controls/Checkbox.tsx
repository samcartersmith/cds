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
    const { checkboxSize } = theme.control;
    const backgroundColor = useMemo(() => {
      return checked || indeterminate ? 'backgroundPrimary' : 'background';
    }, [checked, indeterminate]);

    const borderColor = useMemo(() => {
      // Checked/Indeterminate + Disabled buttons need a transparent border
      if (disabled) {
        return checked || indeterminate ? 'transparent' : 'lineHeavy';
      }

      return checked || indeterminate ? 'backgroundPrimary' : 'lineHeavy';
    }, [checked, indeterminate, disabled]);

    return (
      <Interactable
        background={backgroundColor}
        borderColor={borderColor}
        borderWidth={200}
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
          <Icon color="iconForegroundInverse" name={checked ? 'checkmark' : 'minus'} size="s" />
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
      ref={ref}
      label={children}
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
