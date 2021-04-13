import React, { forwardRef, memo, useMemo } from 'react';

import { useScale, useSpectrum } from '@cbhq/cds-common';
import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';
import { Animated, StyleSheet, View } from 'react-native';

import { useElevationStyles } from '../hooks/useElevationStyles';
import { usePalette } from '../hooks/usePalette';
import * as scaleStyles from '../styles/scale';
import { Interactable } from '../system/Interactable';
import { Control, ControlIconProps, ControlProps } from './Control';

export type SwitchProps = Omit<ControlBaseProps<string> & ControlProps<string>, 'value'>;

const SwitchIcon: React.FC<ControlIconProps> = ({
  pressed,
  disabled,
  backgroundColor,
  animatedBoxValue,
  animatedScaleValue,
}) => {
  const palette = usePalette();
  const cdsScale = useScale();
  const spectrum = useSpectrum();
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
        // NOTE (hannah): Switch thumb is a special case where it should always be white.
        backgroundColor: spectrum === 'light' ? palette.primaryForeground : palette.foreground,
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
    [
      animatedScaleValue,
      spectrum,
      palette.primaryForeground,
      palette.foreground,
      switchWidth,
      switchThumbSize,
      elevationStyle,
    ]
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
  return (
    <Control {...props} accessible accessibilityRole="checkbox" label={children} ref={ref}>
      {SwitchIcon}
    </Control>
  );
  // Make forwardRef result function stay generic function type
}) as (props: SwitchProps & React.RefAttributes<View>) => React.ReactElement;

// Make memoized function stay generic function type
export const Switch = memo(SwitchWithRef) as typeof SwitchWithRef &
  React.MemoExoticComponent<typeof SwitchWithRef>;

const styles = StyleSheet.create({
  thumb: {
    position: 'absolute',
    top: 1,
    left: 1,
  },
});
