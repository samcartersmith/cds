import { DotBaseProps, useIconSize } from '@cbhq/cds-common';
import React, { ImageSourcePropType, View, ViewStyle } from 'react-native';
import { memo } from 'react';
import { useDotPlacementStyles } from '@cbhq/cds-common/hooks/useDotPlacementStyles';
import { RemoteImage } from '../media/RemoteImage';
import { dotStyles } from './dotStyles';

export type DotSymbolProps = Omit<DotBaseProps, 'variant'> & {
  source: ImageSourcePropType | string;
};

export const DotSymbol = memo(
  ({ children, placement, source, size = 's', ...props }: DotSymbolProps) => {
    const placementStyles = useDotPlacementStyles('mobile', placement) as ViewStyle;
    const { iconSize } = useIconSize(size);

    return (
      <View style={!!children && dotStyles.dotRootContainerStyles} {...props}>
        {children}
        <View testID="dotsymbol-inner-container" style={placementStyles}>
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
  },
);
