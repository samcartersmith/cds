import React, { forwardRef, memo, useMemo } from 'react';
import { PressableProps, StyleSheet, View } from 'react-native';
import { NewPartialPaletteConfig } from '@cbhq/cds-common2';
import { ControlBaseProps } from '@cbhq/cds-common2/types/ControlBaseProps';

import { Box } from '../layout/Box';
import { Interactable } from '../system/Interactable';
import { ThemeProvider, useTheme } from '../system/ThemeProvider';

import { Control, ControlIconProps } from './Control';

export type SwitchProps = {
  /** Triggered when switch is toggled. */
  onChange?: () => void;
  /** The palette to override default switch control palette. */
  switchPaletteOverrides?: NewPartialPaletteConfig;
} & Omit<ControlBaseProps<string>, 'value'> &
  Omit<PressableProps, 'disabled' | 'children' | 'style'>;

const SwitchIcon = ({
  pressed,
  checked,
  disabled,
  animatedScaleValue,
  testID,
}: ControlIconProps) => {
  const theme = useTheme();
  const { switchWidth, switchHeight, switchThumbSize } = theme.control;

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
      background={checked ? 'backgroundPrimary' : 'backgroundAlternate'}
      borderRadius={400}
      disabled={disabled}
      pressed={pressed}
      style={trackStyle}
      testID={testID}
    >
      <Interactable
        background="background"
        borderColor="line"
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
  { children, switchPaletteOverrides, ...props }: SwitchProps,
  ref: React.ForwardedRef<View>,
) {
  const theme = useTheme();
  const { switchHeight } = theme.control;
  const palette = useMemo(
    () => switchPaletteOverrides ?? switchControlPalette,
    [switchPaletteOverrides],
  );

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

  return (
    <ThemeProvider
      name={`switch-control${switchPaletteOverrides ? '-overrides' : ''}`}
      palette={palette}
    >
      {children ? (
        <Box alignItems="center" flexDirection="row" minHeight={switchHeight}>
          {switchNode}
        </Box>
      ) : (
        switchNode
      )}
    </ThemeProvider>
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
