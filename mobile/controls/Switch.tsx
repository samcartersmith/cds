import React, { forwardRef, memo, useMemo } from 'react';

import { useScale, useSpectrum } from '@cbhq/cds-common';
import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { Animated, StyleSheet, View } from 'react-native';

import { useElevationStyles } from '../hooks/useElevationStyles';
import { usePalette } from '../hooks/usePalette';
import { interactableStyles } from '../styles/interactable';
import * as scaleStyles from '../styles/scale';
import { InteractionOpacity } from '../system/InteractionOpacity';
import type { TextProps } from '../typography/createText';
import { Control, ControlIconProps, ControlProps } from './Control';

export interface SwitchProps<T extends string> extends Omit<ControlProps<T>, 'label' | 'children'> {
  children?: TextProps['children'];
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
  const spectrum = useSpectrum();
  const { switchWidth, switchHeight, switchThumbSize } = scaleStyles[cdsScale].control;
  const elevationStyle = useElevationStyles(1);

  const trackStyle = useMemo(
    () => [
      disabled && interactableStyles.disabled,
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
    [
      disabled,
      animatedBoxValue,
      palette.backgroundAlternate,
      palette.primary,
      switchWidth,
      switchHeight,
    ]
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
    <InteractionOpacity
      pressed={pressed}
      backgroundColor={backgroundColor}
      disabled={disabled}
      borderRadius="pill"
    >
      <Animated.View style={trackStyle}>
        <Animated.View style={thumbStyle} />
      </Animated.View>
    </InteractionOpacity>
  );
};

const SwitchWithRef = forwardRef(function SwitchWithRef<T extends string>(
  { children, ...props }: SwitchProps<T>,
  ref: React.ForwardedRef<View>
) {
  return (
    <Control {...props} accessible accessibilityRole="checkbox" label={children} ref={ref}>
      {SwitchIcon}
    </Control>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(props: SwitchProps<T> & React.RefAttributes<View>) => React.ReactElement;

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
