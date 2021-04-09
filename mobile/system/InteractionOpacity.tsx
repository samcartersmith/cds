import React, { useMemo } from 'react';

import { BorderRadius } from '@cbhq/cds-common';
import { useInteractableTokens } from '@cbhq/cds-common/hooks/useInteractableTokens';
import { borderRadius as borderRadiusTokens } from '@cbhq/cds-common/tokens/border';
import type { PaletteBackground } from '@cbhq/cds-common/types/Palette';
import { Animated, StyleSheet, View } from 'react-native';

import { usePalette } from '../hooks/usePalette';

export interface InteractionOpacityProps {
  backgroundColor: PaletteBackground;
  disabled?: boolean;
  loading?: boolean;
  borderRadius?: BorderRadius;
  pressed?: boolean;
  pressScale?: Animated.Value;
}

export const InteractionOpacity: React.FC<InteractionOpacityProps> = React.memo(
  function InteractionOpacity({
    children,
    disabled,
    loading,
    backgroundColor,
    borderRadius,
    pressed,
    pressScale,
  }) {
    const palette = usePalette();
    const { underlayColor, pressedOpacity } = useInteractableTokens(backgroundColor);
    const style = useMemo(
      () => [
        [
          styles.underlayPosition,
          {
            backgroundColor: palette[underlayColor],
            borderRadius: borderRadius && borderRadiusTokens[borderRadius],
          },
          pressScale && { transform: [{ scale: pressScale }] },
        ],
      ],
      [underlayColor, borderRadius, pressScale, palette]
    );

    return (
      <View>
        {underlayColor && !disabled && !loading && <Animated.View style={style} />}
        <View style={{ opacity: pressed ? pressedOpacity : 1 }} renderToHardwareTextureAndroid>
          {children}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  // inset underlay by 1 to avoid weird border showing.
  underlayPosition: {
    position: 'absolute',
    top: 1,
    bottom: 1,
    left: 1,
    right: 1,
  },
});
