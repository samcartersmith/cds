import React, { useMemo, memo } from 'react';
import { View } from 'react-native';
import { DotCountBaseProps } from '@cbhq/cds-common/types/DotCountBaseProps';
import { parseDotCountMaxOverflow } from '@cbhq/cds-common/utils/parseDotCountMaxOverflow';
import {
  dotOuterContainerStyles,
  dotCountContent,
  dotCountPadding,
} from '@cbhq/cds-common/tokens/dot';
import { usePalette } from '../hooks/usePalette';
import { TextCaption } from '../typography/TextCaption';
import { dotStyles, getTransform } from './dotStyles';
import { useLayout } from '../hooks/useLayout';

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

    return (
      <>
        <View
          onLayout={onChildrenLayout}
          style={!!children && dotStyles.dotRootContainerStyles}
          {...props}
        >
          {children}
          {count > 0 && (
            <View
              testID="dotcount-inner-container"
              onLayout={onDotLayout}
              style={[
                pinStyles,
                dotCountContent,
                dotCountPadding,
                dotOuterContainerStyles,
                {
                  backgroundColor: palette[variant],
                },
              ]}
            >
              <TextCaption color="primaryForeground">{parseDotCountMaxOverflow(count)}</TextCaption>
            </View>
          )}
        </View>
      </>
    );
  },
);
