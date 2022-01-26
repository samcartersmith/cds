import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import {
  dotCountContent,
  dotCountPadding,
  dotOuterContainerStyles,
} from '@cbhq/cds-common/src/tokens/dot';
import { DotCountBaseProps } from '@cbhq/cds-common/src/types/DotCountBaseProps';
import { parseDotCountMaxOverflow } from '@cbhq/cds-common/src/utils/parseDotCountMaxOverflow';

import { useLayout } from '../hooks/useLayout';
import { usePalette } from '../hooks/usePalette';
import { TextCaption } from '../typography/TextCaption';

import { getTransform } from './dotStyles';

export const DotCount = memo(
  ({ children, pin, variant = 'negative', count, ...props }: DotCountBaseProps) => {
    const palette = usePalette();
    const [childrenSize, onChildrenLayout] = useLayout();
    const [dotSize, onDotLayout] = useLayout();

    const pinStyles = useMemo(() => {
      if (pin) {
        const [vertical, horizontal] = (pin as string).split('-');

        return getTransform({
          translateX:
            horizontal === 'end' ? childrenSize.width - dotSize.width / 2 : -(dotSize.width / 2),
          translateY:
            vertical === 'bottom'
              ? childrenSize.height - dotSize.height / 2
              : -(dotSize.height / 2),
        });
      }
      return {};
    }, [pin, childrenSize.width, childrenSize.height, dotSize.width, dotSize.height]);

    const innerContainerStyles = useMemo(() => {
      return [
        pinStyles,
        dotCountContent,
        dotCountPadding,
        dotOuterContainerStyles,
        {
          backgroundColor: palette[variant],
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
