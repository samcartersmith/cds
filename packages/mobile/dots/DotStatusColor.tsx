import React, { memo, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { useIconSize } from '@cbhq/cds-common';
import { borderRadius } from '@cbhq/cds-common/tokens/borderRadius';
import { DotBaseProps } from '@cbhq/cds-common/types/DotBaseProps';

import { DotPinStylesKey, useDotPinStyles } from '../hooks/useDotPinStyles';
import { usePalette } from '../hooks/usePalette';

import { getTransform } from './dotStyles';
import { useDotsLayout } from './useDotsLayout';

export const DotStatusColor = memo(
  ({ variant, pin, size = 's', children, overlap, ...props }: DotBaseProps) => {
    const palette = usePalette();
    const { iconSize } = useIconSize(size);
    const [childrenSize, onLayout] = useDotsLayout();

    const transforms = useDotPinStyles(childrenSize, iconSize, overlap);

    const pinStyles = useMemo(() => {
      if (pin && transforms !== null) {
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
        borderRadius: borderRadius.roundedFull,
        width: iconSize,
        height: iconSize,
        backgroundColor: palette[variant],
        alignItems: 'center',
        justifyContent: 'center',
        ...pinStyles,
      };
    }, [iconSize, palette, pinStyles, variant]);

    // only check childrenSize when children is defined
    const shouldShow = children !== undefined ? childrenSize !== null : true;

    return (
      <View {...props}>
        <View onLayout={onLayout} testID={`${props.testID}-children`}>
          {children}
        </View>
        {shouldShow && <View style={dotContentStyles} testID="dotstatuscolor-inner-container" />}
      </View>
    );
  },
);
