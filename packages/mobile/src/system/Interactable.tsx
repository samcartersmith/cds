import React, { useMemo, memo } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import {
  ElevationProvider,
  ElevationChildrenProvider,
} from '@cbhq/cds-common/context/ElevationProvider';
import { InteractableBaseProps } from '@cbhq/cds-common/types/InteractableBaseProps';
import { emptyArray } from '@cbhq/cds-utils';
import { Animated, Falsy, View, ViewStyle } from 'react-native';

import { useElevationStyles } from '../hooks/useElevationStyles';
import { useInteractableBorderStyles } from '../hooks/useInteractableBorderStyles';
import { useInteractableTokens } from '../hooks/useInteractableTokens';

export type InteractableProps = {
  children?: React.ReactNode;
  /** Apply animated styles to the outer container. */
  style?: Animated.WithAnimatedValue<Falsy | ViewStyle>[];
  /** Apply animated styles to the inner container. */
  contentStyle?: Falsy | ViewStyle;
} & InteractableBaseProps &
  SharedProps;

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
  block,
  children,
  disabled,
  elevation,
  pressed,
  style = emptyArray,
  contentStyle,
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

  const borderStyles = useInteractableBorderStyles({
    borderColor,
    borderRadius,
    borderWidth,
    elevation,
    pressed,
    transparentWhileInactive,
  });

  const elevationStyles = useElevationStyles(elevation);
  const wrapperStyles = useMemo(
    () =>
      [
        block && { flexGrow: 1 },
        ...style,
        { backgroundColor: bg } as const,
        elevationStyles,
        ...borderStyles,
      ].filter(Boolean),
    [block, bg, borderStyles, elevationStyles, style],
  );

  return (
    <Animated.View style={wrapperStyles} testID={testID}>
      <View style={[contentStyle, { opacity: contentOpacity }]}>
        <ElevationChildrenProvider>{children}</ElevationChildrenProvider>
      </View>
    </Animated.View>
  );
});
