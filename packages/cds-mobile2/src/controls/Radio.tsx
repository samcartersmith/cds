import React, { forwardRef, memo } from 'react';
import { Animated, type ColorValue, StyleSheet, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout';
import { Interactable } from '../system/Interactable';

import { Control, type ControlBaseProps, ControlIconProps } from './Control';

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
