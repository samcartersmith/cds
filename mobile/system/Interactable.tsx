import React, { useMemo, memo } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import { ElevationProvider } from '@cbhq/cds-common/context/ElevationProvider';
import {
  borderRadius as borderRadiusTokens,
  borderWidth as borderWidthTokens,
} from '@cbhq/cds-common/tokens/border';
import { InteractableBaseProps } from '@cbhq/cds-common/types/InteractableBaseProps';
import { emptyArray } from '@cbhq/cds-utils';
import { Animated, Falsy, View, ViewStyle } from 'react-native';

import { useElevationStyles } from '../hooks/useElevationStyles';
import { useInteractableTokens } from '../hooks/useInteractableTokens';
import { usePalette } from '../hooks/usePalette';

export interface InteractableProps extends InteractableBaseProps, SharedProps {
  children?: React.ReactNode;
  /** Apply animated styles to the outer container. */
  style?: Animated.WithAnimatedValue<Falsy | ViewStyle>[];
}

export const Interactable = memo(function Interactable({ children, ...props }: InteractableProps) {
  return (
    <ElevationProvider elevation={props?.elevation}>
      <InteractableContent {...props}>{children}</InteractableContent>
    </ElevationProvider>
  );
});

export const InteractableContent = memo(function InteractableContent({
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  children,
  disabled,
  elevation,
  pressed,
  style = emptyArray,
  transparentWhileInactive,
  testID,
}: InteractableProps) {
  const palette = usePalette();
  const bdColor = transparentWhileInactive && !pressed ? 'transparent' : borderColor;
  const bgColor = transparentWhileInactive && !pressed ? 'transparent' : backgroundColor;
  const overlayColor = bgColor === 'transparent' ? undefined : bgColor;

  const { backgroundColor: bg, contentOpacity } = useInteractableTokens({
    overlayColor,
    disabled,
    pressed,
  });

  const elevationStyles = useElevationStyles(elevation);
  const wrapperStyles = useMemo(
    () =>
      [
        ...style,
        bdColor && {
          borderColor: bdColor === 'transparent' ? 'transparent' : palette[bdColor],
        },
        borderRadius && { borderRadius: borderRadiusTokens[borderRadius] },
        borderWidth && { borderWidth: borderWidthTokens[borderWidth] },
        { backgroundColor: bg, borderStyle: 'solid' } as const,
        elevationStyles,
      ].filter(Boolean),
    [bdColor, bg, borderRadius, borderWidth, elevationStyles, palette, style]
  );

  return (
    <Animated.View style={wrapperStyles} testID={testID}>
      <View style={{ opacity: contentOpacity }}>{children}</View>
    </Animated.View>
  );
});
