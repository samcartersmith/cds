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

    // TODO: These should be tokens, i don't know what the name
    // of the token will be called though. No design direction yet
    const imageBorderStyle = useMemo(() => {
      return {
        borderColor: palette.secondary,
        borderWidth: 1,
      };
    }, [palette.secondary]);

    // TODO: These should be tokens, i don't know what the name
    // of the token will be called though. No design direction yet
    const iconBorderStyle = useMemo(() => {
      return {
        borderWidth: 2,
      };
    }, []);

    return (
      <View {...props}>
        <View onLayout={onChildrenLayout} testID={`${props.testID}-children`}>
          {children}
        </View>
        <View style={pinStyles} testID="dotsymbol-inner-container">
          {source !== undefined && (
            <RemoteImage
              shouldApplyDarkModeEnhacements
              dangerouslySetStyle={imageBorderStyle}
              height={iconSize}
              resizeMode="cover"
              shape="circle"
              source={typeof source === 'string' ? { uri: source } : source}
              testID="dotsymbol-remote-image"
              width={iconSize}
            />
          )}
          {iconName !== undefined && (
            <Box
              background="primary"
              borderColor="secondary"
              borderRadius="roundedFull"
              dangerouslySetStyle={iconBorderStyle}
              onLayout={onIconWrapperLayout}
              spacing={0.5}
            >
              <Icon color="primaryForeground" name={iconName} size={size} />
            </Box>
          )}
        </View>
      </View>
    );
  },
);
