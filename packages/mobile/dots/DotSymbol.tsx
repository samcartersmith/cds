import React, { memo, useMemo } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { DotBaseProps, useIconSize } from '@cbhq/cds-common';

import { useLayout } from '../hooks/useLayout';
import { usePalette } from '../hooks/usePalette';
import { RemoteImage } from '../media/RemoteImage';

import { getTransform } from './dotStyles';

export type DotSymbolProps = Omit<DotBaseProps, 'variant'> & {
  source: ImageSourcePropType | string;
};

export const DotSymbol = memo(({ children, pin, source, size = 's', ...props }: DotSymbolProps) => {
  const { iconSize } = useIconSize(size);
  const [layoutSize, onLayout] = useLayout();
  const palette = usePalette();

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

  const imageBorderStyle = useMemo(() => {
    return {
      borderColor: palette.secondary,
      borderWidth: 1,
    };
  }, [palette.secondary]);

  return (
    <View onLayout={onLayout} {...props}>
      {children}
      <View testID="dotsymbol-inner-container" style={pinStyles}>
        <RemoteImage
          shape="circle"
          testID="dotsymbol-remote-image"
          shouldApplyDarkModeEnhacements
          dangerouslySetStyle={imageBorderStyle}
          source={typeof source === 'string' ? { uri: source } : source}
          width={iconSize}
          height={iconSize}
          resizeMode="cover"
        />
      </View>
    </View>
  );
});
