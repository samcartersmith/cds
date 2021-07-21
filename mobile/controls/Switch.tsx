import React, { forwardRef, memo, useMemo } from 'react';

import { useScale, switchPalette } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';
import { PressableProps, StyleSheet, View } from 'react-native';

import { useElevationStyles } from '../hooks/useElevationStyles';
import { Box } from '../layout/Box';
import * as scaleStyles from '../styles/scale';
import { Interactable } from '../system/Interactable';
import { ThemeProvider } from '../system/ThemeProvider';
import { Control, ControlIconProps } from './Control';

export interface SwitchProps
  extends Omit<ControlBaseProps<string>, 'value'>,
    Omit<PressableProps, 'disabled' | 'children' | 'style'> {
  /** Triggered when switch is toggled. */
  onChange?: () => void;
}

const SwitchIcon: React.FC<ControlIconProps> = ({
  pressed,
  checked,
  disabled,
  animatedScaleValue,
  testID,
}) => {
  const cdsScale = useScale();
  // Switch thumb is a special case where it should always be white.
  const thumbColor = useSpectrumConditional({
    light: 'primaryForeground' as const,
    dark: 'foreground' as const,
  });
  const { switchWidth, switchHeight, switchThumbSize } = scaleStyles[cdsScale].control;
  const elevationStyle = useElevationStyles(1);

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
              inputRange: [0, 1],
              outputRange: [0, switchWidth - switchThumbSize - 2],
            }),
          },
        ],
        elevationStyle,
      },
    ],
    [animatedScaleValue, elevationStyle, switchThumbSize, switchWidth],
  );

  return (
    <Interactable
      testID={testID}
      pressed={pressed}
      backgroundColor={checked ? 'primary' : 'backgroundAlternate'}
      disabled={disabled}
      borderRadius="pill"
      style={trackStyle}
    >
      <Interactable
        pressed={pressed}
        disabled={disabled}
        backgroundColor={thumbColor}
        borderColor="line"
        borderWidth="card"
        borderRadius="round"
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
    <Control {...props} accessible accessibilityRole="switch" label={children} ref={ref}>
      {SwitchIcon}
    </Control>
  );

  return (
    <ThemeProvider palette={switchPalette}>
      {children ? (
        <Box flexDirection="row" minHeight={switchHeight} alignItems="center">
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
