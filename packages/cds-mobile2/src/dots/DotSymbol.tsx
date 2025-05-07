import React, { memo, useMemo } from 'react';
import {
  ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';
import type {
  DotOverlap,
  DotSize,
  IconName,
  PinPlacement,
  SharedAccessibilityProps,
  SharedProps,
} from '@cbhq/cds-common2/types';

import { DotPinStylesKey, useDotPinStyles } from '../hooks/useDotPinStyles';
import { useTheme } from '../hooks/useTheme';
import { Icon, type IconProps } from '../icons/Icon';
import { Box, type BoxBaseProps } from '../layout/Box';
import { RemoteImage } from '../media/RemoteImage';

import { getTransform } from './dotStyles';
import { useDotsLayout } from './useDotsLayout';

export type DotSymbolBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    /** Add an icon to the dot. IconName can be any CDS icon name. */
    iconName?: IconName;
    /** The color of the Icon rendered */
    color?: IconProps['color'];
    /** Add an arbitrary ReactNode to the dot. */
    symbol?: React.ReactNode;
    background?: BoxBaseProps['background'];
    borderColor?: BoxBaseProps['borderColor'];
    /** Position of dot relative to its parent */
    pin?: PinPlacement;
    /** Children of where the dot will anchor to */
    children?: React.ReactNode;
    /** Size of dot */
    size?: DotSize;
    /** Indicates what shape Dot is overlapping */
    overlap?: DotOverlap;
    source?: ImageSourcePropType | string;
    style?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
  };

export type DotSymbolProps = DotSymbolBaseProps;

export const DotSymbol = memo(
  ({
    children,
    symbol,
    pin,
    source,
    overlap,
    iconName,
    size = 's',
    color = 'fgInverse',
    background = 'bgPrimary',
    borderColor = 'bgSecondary',
    style,
    iconStyle,
    imageStyle,
    ...props
  }: DotSymbolProps) => {
    const theme = useTheme();
    const iconSize = theme.iconSize[size];
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
