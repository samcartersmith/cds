import React, { memo, useMemo } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { DotSymbolBaseProps, useIconSize } from '@cbhq/cds-common';

import { DotPinStylesKey, useDotPinStyles } from '../hooks/useDotPinStyles';
import { useLayout } from '../hooks/useLayout';
import { usePalette } from '../hooks/usePalette';
import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { RemoteImage } from '../media/RemoteImage';

import { getTransform } from './dotStyles';

export type DotSymbolProps = DotSymbolBaseProps & {
  source?: ImageSourcePropType | string;
};

export const DotSymbol = memo(
  ({ children, pin, source, overlap, iconName, size = 's', ...props }: DotSymbolProps) => {
    const { iconSize } = useIconSize(size);
    const [childrenSize, onChildrenLayout] = useLayout();
    const [iconWrapperSize, onIconWrapperLayout] = useLayout();
    const palette = usePalette();
    const dotIsIcon = iconName !== undefined;

    const transforms = useDotPinStyles(
      childrenSize,
      dotIsIcon ? iconWrapperSize : iconSize,
      overlap,
    );

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

    const imageBorderStyle = useMemo(() => {
      return {
        borderColor: palette.secondary,
        borderWidth: 1,
      };
    }, [palette.secondary]);

    const iconBorderStyle = useMemo(() => {
      return {
        borderWidth: 2,
      };
    }, []);

    return (
      <View onLayout={onChildrenLayout} {...props}>
        {children}
        <View testID="dotsymbol-inner-container" style={pinStyles}>
          {source !== undefined && (
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
          )}
          {iconName !== undefined && (
            <Box
              onLayout={onIconWrapperLayout}
              spacing={0.5}
              dangerouslySetStyle={iconBorderStyle}
              borderRadius="round"
              background="primary"
              borderColor="secondary"
            >
              <Icon color="primaryForeground" name={iconName} size={size} />
            </Box>
          )}
        </View>
      </View>
    );
  },
);
