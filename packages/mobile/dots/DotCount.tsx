import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import {
  dotCountContent,
  dotCountPadding,
  dotOuterContainerStyles,
} from '@cbhq/cds-common/tokens/dot';
import { DotCountBaseProps } from '@cbhq/cds-common/types/DotCountBaseProps';
import { parseDotCountMaxOverflow } from '@cbhq/cds-common/utils/parseDotCountMaxOverflow';

import { DotPinStylesKey, useDotPinStyles } from '../hooks/useDotPinStyles';
import { useLayout } from '../hooks/useLayout';
import { usePalette } from '../hooks/usePalette';
import { TextCaption } from '../typography/TextCaption';

import { getTransform } from './dotStyles';

export const DotCount = memo(
  ({ children, pin, variant = 'negative', count, overlap, ...props }: DotCountBaseProps) => {
    const palette = usePalette();
    const [childrenSize, onChildrenLayout] = useLayout();
    const [dotSize, onDotLayout] = useLayout();
    const transforms = useDotPinStyles(childrenSize, dotSize, overlap);

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

    const innerContainerStyles = useMemo(() => {
      return [
        pinStyles,
        dotCountContent,
        dotCountPadding,
        dotOuterContainerStyles,
        {
          backgroundColor: palette[variant],
          borderColor: palette.secondary,
        },
      ];
    }, [palette, pinStyles, variant]);

    return (
      <View onLayout={onChildrenLayout} {...props}>
        {children}
        {count > 0 && (
          <View
            testID="dotcount-inner-container"
            onLayout={onDotLayout}
            style={innerContainerStyles}
          >
            <TextCaption color="primaryForeground">{parseDotCountMaxOverflow(count)}</TextCaption>
          </View>
        )}
      </View>
    );
  },
);
