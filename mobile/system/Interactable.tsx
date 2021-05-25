import React, { useMemo, memo } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import { ElevationProvider } from '@cbhq/cds-common/context/ElevationProvider';
import { InteractableBaseProps } from '@cbhq/cds-common/types/InteractableBaseProps';
import { emptyArray } from '@cbhq/cds-utils';
import { Animated, Falsy, View, ViewStyle } from 'react-native';

import { useElevationStyles } from '../hooks/useElevationStyles';
import { useInteractableBorderStyles } from '../hooks/useInteractableBorderStyles';
import { useInteractableTokens } from '../hooks/useInteractableTokens';

export interface InteractableProps extends InteractableBaseProps, SharedProps {
  children?: React.ReactNode;
  /** Apply animated styles to the outer container. */
  style?: Animated.WithAnimatedValue<Falsy | ViewStyle>[];
}

export const Interactable = memo(function Interactable({
  children,
  style = emptyArray,
  ...props
}: InteractableProps) {
  const borderStyles = useInteractableBorderStyles(props);
  const styles = useMemo(() => [...style, ...borderStyles], [borderStyles, style]);
  return (
    <ElevationProvider elevation={props?.elevation}>
      <InteractableContent style={styles} {...props}>
        {children}
      </InteractableContent>
    </ElevationProvider>
  );
});

export const InteractableContent = memo(function InteractableContent({
  backgroundColor,
  block,
  children,
  disabled,
  elevation,
  pressed,
  style = emptyArray,
  transparentWhileInactive,
  testID,
}: InteractableProps) {
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
        block && { width: '100%' },
        ...style,
        { backgroundColor: bg } as const,
        elevationStyles,
      ].filter(Boolean),
    [block, bg, elevationStyles, style]
  );

  return (
    <Animated.View style={wrapperStyles} testID={testID}>
      <View style={{ opacity: contentOpacity }}>{children}</View>
    </Animated.View>
  );
});
