import React, { useMemo, memo } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { DotBaseProps, useIconSize } from '@cbhq/cds-common';
import { RemoteImage } from '../media/RemoteImage';
import { getTransform } from './dotStyles';
import { useLayout } from '../hooks/useLayout';

export type DotSymbolProps = Omit<DotBaseProps, 'variant'> & {
  source: ImageSourcePropType | string;
};

export const DotSymbol = memo(({ children, pin, source, size = 's', ...props }: DotSymbolProps) => {
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

  return (
    <View onLayout={onLayout} {...props}>
      {children}
      <View testID="dotsymbol-inner-container" style={pinStyles}>
        <RemoteImage
          shape="circle"
          testID="dotsymbol-remote-image"
          source={typeof source === 'string' ? { uri: source } : source}
          width={iconSize}
          height={iconSize}
          resizeMode="cover"
        />
      </View>
    </View>
  );
});
