import React, { useMemo, memo } from 'react';

import { PaletteBackground } from '@cbhq/cds-common';
import { useInteractableTokens } from '@cbhq/cds-common/hooks/useInteractableTokens';
import {
  borderRadius as borderRadiusTokens,
  borderWidth as borderWidthTokens,
} from '@cbhq/cds-common/tokens/border';
import { InteractableBaseProps } from '@cbhq/cds-common/types/InteractableBaseProps';
import { emptyArray } from '@cbhq/cds-utils';
import { Animated, Falsy, StyleSheet, View, ViewStyle } from 'react-native';

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
}: InteractableProps) {
  const palette = usePalette();
  const hideBackgrounds = backgroundColor === 'transparent';
  const { disabledOpacity, underlayColor, pressedOpacity } = useInteractableTokens(backgroundColor);

  const backgroundStyles = useMemo(
    () => ({
      backgroundColor: hideBackgrounds
        ? 'transparent'
        : palette[backgroundColor as PaletteBackground],
    }),
    [backgroundColor, hideBackgrounds, palette]
  );

  const containerStyles = useMemo(
    () => [
      styles.interactable,
      borderColor && { borderColor: palette[borderColor] },
      borderRadius && { borderRadius: borderRadiusTokens[borderRadius] },
      borderWidth && { borderWidth: borderWidthTokens[borderWidth] },
      disabled && { opacity: disabledOpacity },
    ],
    [palette, borderColor, borderRadius, borderWidth, disabled, disabledOpacity]
  );

  const underlayStyles = useMemo(
    () => [
      StyleSheet.absoluteFillObject,
      {
        backgroundColor: palette[underlayColor],
      },
    ],
    [underlayColor, palette]
  );

  return (
    <Animated.View style={[backgroundStyles, ...containerStyles, ...style]}>
      {pressed && !disabled && !hideBackgrounds && <View style={underlayStyles} />}

      <View
        style={[
          backgroundStyles,
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
