import React, { forwardRef, memo, useMemo } from 'react';
import { PressableProps, StyleSheet, View } from 'react-native';
import { useScale } from '@cbhq/cds-common';
import { switchControlPalette } from '@cbhq/cds-common/palette/constants';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';

import { Box } from '../layout/Box';
import * as scaleStyles from '../styles/scale';
import { Interactable } from '../system/Interactable';
import { ThemeProvider } from '../system/ThemeProvider';

import { Control, ControlIconProps } from './Control';

export type SwitchProps = {
  /** Triggered when switch is toggled. */
  onChange?: () => void;
} & Omit<ControlBaseProps<string>, 'value'> &
  Omit<PressableProps, 'disabled' | 'children' | 'style'>;

const SwitchIcon = ({
  pressed,
  checked,
  disabled,
  animatedScaleValue,
  testID,
}: ControlIconProps) => {
  const cdsScale = useScale();
  const { switchWidth, switchHeight, switchThumbSize } = scaleStyles[cdsScale].control;

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
      background={checked ? 'primary' : 'backgroundAlternate'}
      borderRadius="roundedLarge"
      disabled={disabled}
      pressed={pressed}
      style={trackStyle}
      testID={testID}
    >
      <Interactable
        background="background"
        borderColor="line"
        borderRadius="roundedFull"
        borderWidth="card"
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
  const cdsScale = useScale();
  const { switchHeight } = scaleStyles[cdsScale].control;

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
    <ThemeProvider name="switch-control" palette={switchControlPalette}>
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
