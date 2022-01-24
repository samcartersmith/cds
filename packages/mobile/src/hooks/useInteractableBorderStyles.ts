import { useMemo } from 'react';

import { borderWidth as borderWidthTokens } from '@cbhq/cds-common/tokens/border';
import { useInteractableBorderRadius } from '@cbhq/cds-common/hooks/useInteractableBorderRadius';
import { Animated, Falsy, ViewStyle } from 'react-native';

import type { InteractableProps } from '../system/Interactable';
import { useElevationBorderColor } from './useElevationBorderColor';
import { usePaletteOrTransparentColor } from './usePaletteOrTransparentColor';

type InteractableBorderStyleProps = Pick<
  InteractableProps,
  | 'borderRadius'
  | 'borderColor'
  | 'borderWidth'
  | 'elevation'
  | 'pressed'
  | 'transparentWhileInactive'
>;

export const useInteractableBorderColor = ({
  borderColor,
  elevation,
  pressed,
  transparentWhileInactive,
}: InteractableBorderStyleProps) => {
  const defaultBorderColor = usePaletteOrTransparentColor(borderColor);
  const elevationBorderColor = useElevationBorderColor(borderColor);

  if (transparentWhileInactive) {
    if (pressed) return defaultBorderColor;
    return 'transparent';
  }

  return elevation ? elevationBorderColor : defaultBorderColor;
};

/**
 * useInteractableBorderStyles guarantees that the border color of Interactable is not impacted by ElevationProvider palette overrides
 */
export const useInteractableBorderStyles = ({
  borderRadius,
  borderWidth,
  ...props
}: InteractableBorderStyleProps): Animated.WithAnimatedValue<Falsy | ViewStyle>[] => {
  const borderColor = useInteractableBorderColor(props);
  const borderRadiusValue = useInteractableBorderRadius(borderRadius);

  return useMemo(() => {
    return [
      {
        borderColor,
        borderStyle: 'solid',
        borderRadius: borderRadiusValue,
      },
      borderWidth && { borderWidth: borderWidthTokens[borderWidth] },
    ];
  }, [borderColor, borderRadiusValue, borderWidth]);
};
