import React, { forwardRef, memo, useMemo } from 'react';

import { useScale, switchPalette } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';
import { Animated, PressableProps, StyleSheet, View } from 'react-native';

import { useElevationStyles } from '../hooks/useElevationStyles';
import { usePalette } from '../hooks/usePalette';
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
  disabled,
  backgroundColor,
  animatedBoxValue,
  animatedScaleValue,
}) => {
  const palette = usePalette();
  const cdsScale = useScale();
  // Switch thumb is a special case where it should always be white.
  const thumbColor = useSpectrumConditional({
    light: palette.primaryForeground,
    dark: palette.foreground,
  });
  const { switchWidth, switchHeight, switchThumbSize } = scaleStyles[cdsScale].control;
  const elevationStyle = useElevationStyles(1);

  const trackStyle = useMemo(
    () => [
      {
        backgroundColor: animatedBoxValue.interpolate({
          inputRange: [0, 1],
          outputRange: [palette.backgroundAlternate, palette.primary],
        }),
        borderRadius: borderRadius.pill,
        width: switchWidth,
        height: switchHeight,
      },
    ],
    [animatedBoxValue, palette.backgroundAlternate, palette.primary, switchWidth, switchHeight]
  );

  const thumbStyle = useMemo(
    () => [
      styles.thumb,
      {
        width: switchThumbSize,
        height: switchThumbSize,
        backgroundColor: thumbColor,
        borderRadius: borderRadius.round,
        transform: [
          {
            translateX: animatedScaleValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, switchWidth - switchThumbSize - 2],
            }),
          },
        ],
      },
      elevationStyle,
    ],
    [switchThumbSize, thumbColor, animatedScaleValue, switchWidth, elevationStyle]
  );

  return (
    <Interactable
      pressed={pressed}
      backgroundColor={backgroundColor}
      disabled={disabled}
      borderRadius="pill"
    >
      <Animated.View style={trackStyle}>
        <Animated.View style={thumbStyle} />
      </Animated.View>
    </Interactable>
  );
};

const SwitchWithRef = forwardRef(function SwitchWithRef(
  { children, ...props }: SwitchProps,
  ref: React.ForwardedRef<View>
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
