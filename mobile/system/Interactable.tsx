import React, { useMemo, memo } from 'react';

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
  /** Hide the underlay on press. */
  hideUnderlay?: boolean;
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
  hideUnderlay,
  pressed,
  style = emptyArray,
}: InteractableProps) {
  const palette = usePalette();
  const { disabledOpacity, underlayColor, pressedOpacity } = useInteractableTokens(backgroundColor);

  const containerStyles = useMemo(
    () => [
      styles.interactable,
      { backgroundColor: palette[backgroundColor] },
      borderColor && { borderColor: palette[borderColor] },
      borderRadius && { borderRadius: borderRadiusTokens[borderRadius] },
      borderWidth && { borderWidth: borderWidthTokens[borderWidth] },
      disabled && { opacity: disabledOpacity },
    ],
    [palette, backgroundColor, borderColor, borderRadius, borderWidth, disabled, disabledOpacity]
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
    <Animated.View style={[...containerStyles, ...style]}>
      {pressed && !disabled && !hideUnderlay && <View style={underlayStyles} />}

      <View
        style={{ backgroundColor: palette[backgroundColor], opacity: pressed ? pressedOpacity : 1 }}
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
