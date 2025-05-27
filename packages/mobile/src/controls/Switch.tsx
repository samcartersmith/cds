import React, { forwardRef, memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout/Box';
import { Interactable } from '../system/Interactable';

import { Control, type ControlBaseProps, ControlIconProps } from './Control';

export type SwitchBaseProps = Omit<ControlBaseProps<string>, 'value' | 'onChange' | 'style'> & {
  /** Triggered when switch is toggled. */
  onChange?: () => void;
};

export type SwitchProps = SwitchBaseProps;

const SwitchIcon = ({
  pressed,
  checked,
  disabled,
  animatedScaleValue,
  testID,
}: ControlIconProps) => {
  const theme = useTheme();
  const { switchWidth, switchHeight, switchThumbSize } = theme.controlSize;

  const trackStyle = useMemo(
    () => [
      {
        width: switchWidth,
        height: switchHeight,
      },
    ],
    [switchWidth, switchHeight],
  );

  const thumbStyle = useMemo(
    () => [
      styles.thumb,
      {
        width: switchThumbSize,
        height: switchThumbSize,
        transform: [
          {
            translateX: animatedScaleValue.interpolate({
              inputRange: [0.9, 1],
              outputRange: [0, switchWidth - switchThumbSize - 2],
            }),
          },
        ],
      },
    ],
    [animatedScaleValue, switchThumbSize, switchWidth],
  );

  return (
    <Interactable
      background={checked ? 'bgPrimary' : 'bgTertiary'}
      borderRadius={400}
      borderWidth={0}
      disabled={disabled}
      pressed={pressed}
      style={trackStyle}
      testID={testID}
    >
      <Interactable
        background={theme.activeColorScheme === 'dark' ? 'bgInverse' : 'bg'}
        borderColor="bgLine"
        borderRadius={1000}
        borderWidth={100}
        disabled={disabled}
        pressed={pressed}
        style={thumbStyle}
      />
    </Interactable>
  );
};

const SwitchWithRef = forwardRef(function SwitchWithRef(
  { children, ...props }: SwitchProps,
  ref: React.ForwardedRef<View>,
) {
  const theme = useTheme();
  const { switchHeight } = theme.controlSize;

  const switchNode = (
    <Control
      {...props}
      ref={ref}
      accessible
      shouldUseSwitchTransition
      accessibilityRole="switch"
      label={children}
    >
      {SwitchIcon}
    </Control>
  );

  return children ? (
    <Box alignItems="center" flexDirection="row" minHeight={switchHeight}>
      {switchNode}
    </Box>
  ) : (
    switchNode
  );
});

export const Switch = memo(SwitchWithRef);

const styles = StyleSheet.create({
  thumb: {
    position: 'absolute',
    top: 1,
    left: 1,
  },
});
