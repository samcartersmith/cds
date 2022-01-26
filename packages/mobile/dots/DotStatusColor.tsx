import React, { memo, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { useIconSize } from '@cbhq/cds-common';
import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { DotBaseProps } from '@cbhq/cds-common/types/DotBaseProps';

import { useLayout } from '../hooks/useLayout';
import { usePalette } from '../hooks/usePalette';

import { getTransform } from './dotStyles';

export const DotStatusColor = memo(
  ({ variant, pin, size = 's', children, ...props }: DotBaseProps) => {
    const palette = usePalette();
    const { iconSize } = useIconSize(size);
    const [layoutSize, onLayout] = useLayout();

    const pinStyles = useMemo(() => {
      // If pin placement exist, we compute the right
      // position to pin the dot
      if (pin) {
        const [vertical, horizontal] = (pin as string).split('-');

        return getTransform({
          translateX: horizontal === 'end' ? layoutSize.width - iconSize / 2 : -(iconSize / 2),
          translateY: vertical === 'bottom' ? layoutSize.height - iconSize / 2 : -(iconSize / 2),
        });
      }

      return {};
    }, [iconSize, layoutSize.height, layoutSize.width, pin]);

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
