import React, { memo, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { useIconSize } from '@cbhq/cds-common';
import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { DotBaseProps } from '@cbhq/cds-common/types/DotBaseProps';

import { DotPinStylesKey, useDotPinStyles } from '../hooks/useDotPinStyles';
import { useLayout } from '../hooks/useLayout';
import { usePalette } from '../hooks/usePalette';

import { getTransform } from './dotStyles';

export const DotStatusColor = memo(
  ({ variant, pin, size = 's', children, overlap, ...props }: DotBaseProps) => {
    const palette = usePalette();
    const { iconSize } = useIconSize(size);
    const [childrenSize, onLayout] = useLayout();

    const transforms = useDotPinStyles(childrenSize, iconSize, overlap);

    const pinStyles = useMemo(() => {
      if (pin) {
        const [vertical, horizontal] = (pin as string).split('-');

        return getTransform(
          transforms[horizontal as DotPinStylesKey],
          transforms[vertical as DotPinStylesKey],
        );
      }
      return {};
    }, [pin, transforms]);

    const dotContentStyles: ViewStyle = useMemo(() => {
      return {
        borderRadius: borderRadius.round,
        width: iconSize,
        height: iconSize,
        backgroundColor: palette[variant],
        alignItems: 'center',
        justifyContent: 'center',
        ...pinStyles,
      };
    }, [iconSize, palette, pinStyles, variant]);

    return (
      <View onLayout={onLayout} {...props}>
        {children}
        <View testID="dotstatuscolor-inner-container" style={dotContentStyles} />
      </View>
    );
  },
);
