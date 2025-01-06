import React, { memo, useMemo } from 'react';
import {
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
  ImageSourcePropType,
  View,
} from 'react-native';
import { DotSymbolBaseProps, useIconSize } from '@cbhq/cds-common2';

import { DotPinStylesKey, useDotPinStyles } from '../hooks/useDotPinStyles';
import { type IconProps, Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { RemoteImage } from '../media/RemoteImage';
import { useTheme } from '../system';

import { getTransform } from './dotStyles';
import { useDotsLayout } from './useDotsLayout';

export type DotSymbolProps = DotSymbolBaseProps & {
  source?: ImageSourcePropType | string;
  color?: IconProps['color'];
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

export const DotSymbol = memo(
  ({
    children,
    symbol,
    pin,
    source,
    overlap,
    iconName,
    size = 's',
    color = 'textForegroundInverse',
    background = 'backgroundPrimary',
    borderColor = 'backgroundSecondary',
    style,
    iconStyle,
    imageStyle,
    ...props
  }: DotSymbolProps) => {
    const theme = useTheme();
    const { iconSize } = useIconSize(size);
    const [childrenSize, onChildrenLayout] = useDotsLayout();
    const dotIsIcon = iconName !== undefined;
    const transforms = useDotPinStyles(
      childrenSize,
      dotIsIcon
        ? // iconSize + border + spacing
          iconSize + 4 + 4
        : iconSize,
      overlap,
    );

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

    // TODO: These should be tokens, i don't know what the name
    // of the token will be called though. No design direction yet
    const imageBorderStyle = useMemo(() => {
      return {
        borderColor: theme.color[borderColor],
        borderWidth: 1,
      };
    }, [theme.color, borderColor]);

    // TODO: These should be tokens, i don't know what the name
    // of the token will be called though. No design direction yet
    const iconBorderStyle = useMemo(() => {
      return {
        borderWidth: 2,
      };
    }, []);

    // only check childrenSize when children is defined
    const shouldShow = children !== undefined ? childrenSize !== null : true;

    return (
      <View {...props} style={style}>
        <View onLayout={onChildrenLayout} testID={`${props.testID}-children`}>
          {children}
        </View>
        {shouldShow && (
          <View style={pinStyles} testID="dotsymbol-inner-container">
            {source !== undefined && (
              <RemoteImage
                darkModeEnhancementsApplied
                height={iconSize}
                resizeMode="cover"
                shape="circle"
                source={typeof source === 'string' ? { uri: source } : source}
                style={[imageBorderStyle, imageStyle]}
                testID="dotsymbol-remote-image"
                width={iconSize}
              />
            )}
            {iconName !== undefined && (
              <Box
                background={background}
                borderColor={borderColor}
                borderRadius={1000}
                padding={0.5}
                style={[iconBorderStyle, iconStyle]}
              >
                <Icon color={color} name={iconName} size={size} />
              </Box>
            )}
            {symbol}
          </View>
        )}
      </View>
    );
  },
);
