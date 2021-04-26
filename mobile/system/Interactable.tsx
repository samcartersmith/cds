import React, { useMemo, memo } from 'react';

import { useInteractableTokens } from '@cbhq/cds-common/hooks/useInteractableTokens';
import {
  borderRadius as borderRadiusTokens,
  borderWidth as borderWidthTokens,
} from '@cbhq/cds-common/tokens/border';
import { InteractableBaseProps } from '@cbhq/cds-common/types/InteractableBaseProps';
import { emptyArray } from '@cbhq/cds-utils';
import { Animated, Falsy, Platform, StyleSheet, View, ViewStyle } from 'react-native';

import { usePalette } from '../hooks/usePalette';

export interface InteractableProps extends InteractableBaseProps {
  children: NonNullable<React.ReactNode>;
  /** Apply animated styles to the outer container. */
  style?: Animated.WithAnimatedValue<Falsy | ViewStyle>[];
}

export const Interactable = memo(function Interactable({
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  children,
  disabled,
  pressed,
  style = emptyArray,
  transparentWhileInactive,
}: InteractableProps) {
  const palette = usePalette();
  const bgColor = transparentWhileInactive && !pressed ? 'transparent' : backgroundColor;
  const bdColor = transparentWhileInactive && !pressed ? 'transparent' : borderColor;
  const { disabledOpacity, underlayColor, pressedOpacity } = useInteractableTokens(bgColor);

  const containerStyles = useMemo(
    () => [
      styles.interactable,
      bdColor && {
        borderColor: bdColor === 'transparent' ? 'transparent' : palette[bdColor],
      },
      borderRadius && { borderRadius: borderRadiusTokens[borderRadius] },
      borderWidth && { borderWidth: borderWidthTokens[borderWidth] },
      disabled && { opacity: disabledOpacity },
    ],
    [palette, bdColor, borderRadius, borderWidth, disabled, disabledOpacity]
  );

  const overlayStyles = useMemo(
    () => ({
      backgroundColor: bgColor === 'transparent' ? 'transparent' : palette[bgColor],
    }),
    [bgColor, palette]
  );

  const underlayStyles = useMemo(
    () => ({
      ...StyleSheet.absoluteFillObject,
      backgroundColor: palette[underlayColor],
    }),
    [underlayColor, palette]
  );

  // We need to conditionally apply the background color here because...
  // - On Android the background is _required_ otherwise the overlay doesnt expand
  //    the entire box on all sides, revealing a faint 1px white inset border.
  // - On iOS the background should be _avoided_ since it adds a 1px border
  //    on press that conflicts with the existing styles.
  const interactableStyles = useMemo(
    () => [...containerStyles, Platform.OS === 'android' ? overlayStyles : undefined, ...style],
    [containerStyles, overlayStyles, style]
  );

  return (
    <Animated.View style={interactableStyles}>
      {pressed && !disabled && bgColor !== 'transparent' && <View style={underlayStyles} />}

      <View
        style={[
          overlayStyles,
          {
            opacity: pressed ? pressedOpacity : 1,
          },
        ]}
        renderToHardwareTextureAndroid
      >
        {children}
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  interactable: {
    overflow: 'hidden',
    borderStyle: 'solid',
  },
});
