import React, { forwardRef, memo } from 'react';
import { AccessibilityProps, Animated, type ColorValue, StyleSheet, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { SharedProps } from '@cbhq/cds-common2';
import { entries } from '@cbhq/cds-utils';
import { isDevelopment } from '@cbhq/cds-utils/env';

import { useTheme } from '../hooks/useTheme';
import { Box, type BoxBaseProps, Group } from '../layout';
import type { GroupBaseProps } from '../layout/Group';
import { Interactable } from '../system/Interactable';

import { Control, type ControlBaseProps, ControlIconProps } from './Control';

export type RadioBaseProps<T extends string> = ControlBaseProps<T>;

export type RadioProps<T extends string> = RadioBaseProps<T>;

const DotSvg = ({ color }: { color?: ColorValue }) => (
  <Svg fill="none" height="20" viewBox="0 0 20 20" width="20">
    <Rect height="19" rx="9.5" stroke={color} width="19" x="0.5" y="0.5" />
    <Path
      d="M9.98877 16.9952C13.8548 16.9952 16.9888 13.8612 16.9888 9.99518C16.9888 6.12918 13.8548 2.99518 9.98877 2.99518C6.12278 2.99518 2.98877 6.12918 2.98877 9.99518C2.98877 13.8612 6.12278 16.9952 9.98877 16.9952Z"
      fill={color}
    />
  </Svg>
);

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
      borderWidth={100}
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
        <Box alignItems="center" justifyContent="center" testID="radio-icon">
          <DotSvg color={theme.color.fgPrimary} />
        </Box>
      </Animated.View>
    </Interactable>
  );
};

const RadioWithRef = forwardRef(function Radio<T extends string>(
  { children, accessibilityHint, accessibilityLabel, ...props }: RadioProps<T>,
  ref: React.ForwardedRef<View>,
) {
  const accessibilityLabelValue =
    typeof children === 'string' && accessibilityLabel === undefined
      ? children
      : accessibilityLabel;

  return (
    <Control<T>
      {...props}
      ref={ref}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabelValue}
      // TO DO: This should be `accessibilityRole="radio"` but RN has an issue https://github.com/facebook/react-native/issues/43266
      accessibilityRole="button"
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

export type RadioGroupBaseProps<T extends string> = Omit<
  AccessibilityProps,
  'accessibilityLabelledBy'
> &
  SharedProps &
  Pick<GroupBaseProps<BoxBaseProps>, 'direction' | 'gap'> & {
    /**
     * Multiple choice options for the radio group. The object key represents
     * the radio input value and the object value represents the radio option label.
     */
    options: Record<T, string | React.ReactNode>;
    /** Set a label summary for the group of radios. */
    label?: React.ReactNode;
    /** Currently selected value. */
    value?: T;
    /** Handle change event when pressing on a radio option. */
    onChange?: RadioProps<T>['onChange'];

    /** A11Y label to indicate order of radio buttons when focused on one button */
    radioAccessibilityLabel?: string;
  };

export type RadioGroupProps<T extends string> = RadioGroupBaseProps<T>;

const RadioGroupWithRef = forwardRef(function RadioGroup<T extends string>(
  {
    label,
    value,
    onChange,
    options,
    testID,
    accessibilityLabel,
    accessibilityHint,
    radioAccessibilityLabel,
    ...props
  }: RadioGroupProps<T>,
  ref: React.ForwardedRef<View>,
) {
  const accessibilityLabelValue =
    typeof label === 'string' && accessibilityLabel === undefined ? label : accessibilityLabel;

  if (
    isDevelopment() &&
    radioAccessibilityLabel &&
    (!radioAccessibilityLabel.includes('{{number}}') ||
      !radioAccessibilityLabel.includes('{{total}}'))
  ) {
    console.error(
      `radioAccessibilityLabel must include "{{number}}" and "{{total}}": ${radioAccessibilityLabel}`,
    );
  }

  return (
    <Group
      ref={ref}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabelValue}
      accessibilityRole="radiogroup"
      testID={testID}
      {...props}
    >
      {label}
      {entries<Record<T, string | React.ReactNode>>(options).map(([optionValue, option], index) => {
        const checked = value === optionValue;

        // RN doesn't natively support radio group length (e.g. "Radio button 1 of 3") being announced
        // by screen readers, so we need to manually add this information to the accessibility label.
        let accessibilityLabel: string | undefined;
        if (typeof option === 'string') {
          accessibilityLabel = `${option}. ${radioAccessibilityLabel
            ?.replace('{{number}}', (index + 1).toString())
            .replace('{{total}}', Object.keys(options).length.toString())}`;
        }

        return (
          <Radio<T>
            key={optionValue}
            accessibilityLabel={accessibilityLabel}
            checked={checked}
            onChange={onChange}
            testID={testID ? `${testID}-${optionValue}` : undefined}
            value={optionValue}
          >
            {option}
          </Radio>
        );
      })}
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
