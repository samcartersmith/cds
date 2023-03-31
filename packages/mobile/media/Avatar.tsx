import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusAlias';
import { useAvatarSize } from '@cbhq/cds-common/media/useAvatarSize';
import { useAvatarSrc } from '@cbhq/cds-common/media/useAvatarSrc';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { avatarDefaultFontColor, colorSchemeMap } from '@cbhq/cds-common/tokens/avatar';
import { interactableHeight } from '@cbhq/cds-common/tokens/interactableHeight';
import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';

import { useAccessibleForeground } from '../color/useAccessibleForeground';
import { Box } from '../layout';
import { TextBody, TextCaption, TextTitle2 } from '../typography';
import { paletteValueToHex } from '../utils/palette';

import { RemoteImage } from './RemoteImage';

const borderWidth = 2;
export const coloredFallbackTestID = 'cds-avatar-colored-fallback';

export const Avatar = memo(
  ({
    src,
    shape = 'circle',
    size = 'l',
    borderColor,
    testID,
    dangerouslySetSize,
    colorScheme: colorSchemeProp,
    name,
  }: AvatarBaseProps) => {
    const borderRadius = useShapeToBorderRadiusAlias(shape);
    const avatarSize = useAvatarSize(size);
    const imgSrc = useAvatarSrc(src);
    const spectrum = useSpectrum();
    const placeholderLetter = name?.charAt(0);
    const isLargestSize = size.includes('xx');
    const isCompactAvatarButton =
      dangerouslySetSize && dangerouslySetSize <= interactableHeight.xSmall.regular;
    const isNormalAvatarButton =
      dangerouslySetSize && dangerouslySetSize > interactableHeight.xSmall.regular;

    const colorScheme = useMemo(
      () => colorSchemeMap[spectrum][colorSchemeProp ?? 'blue'],
      [colorSchemeProp, spectrum],
    );

    const colorSchemeHex = paletteValueToHex(colorScheme, spectrum);
    const fallbackTextColor = useAccessibleForeground({
      background: colorSchemeHex,
      color: avatarDefaultFontColor,
      usage: isLargestSize ? 'largeText' : 'normalText',
    });

    const computedSize = dangerouslySetSize ?? avatarSize;
    const shouldShowAvatarImage = !!src || !name;
    // only show a border for normal and fallback image treatments
    const hasBorder = shouldShowAvatarImage && borderColor && shape !== 'hexagon';

    const avatarText = useMemo(() => {
      if (isLargestSize || isNormalAvatarButton) {
        return (
          <TextTitle2 dangerouslySetColor={fallbackTextColor} align="center">
            {placeholderLetter}
          </TextTitle2>
        );
      }
      if (size === 'm' || isCompactAvatarButton) {
        return (
          <TextCaption dangerouslySetColor={fallbackTextColor} align="center">
            {placeholderLetter}
          </TextCaption>
        );
      }

      return (
        <TextBody dangerouslySetColor={fallbackTextColor} align="center">
          {placeholderLetter}
        </TextBody>
      );
    }, [
      isLargestSize,
      isNormalAvatarButton,
      size,
      isCompactAvatarButton,
      fallbackTextColor,
      placeholderLetter,
    ]);

    const coloredFallback = useMemo(() => {
      return (
        <Box
          borderRadius={borderRadius}
          height="100%"
          width="100%"
          justifyContent="center"
          alignItems="center"
          dangerouslySetBackground={colorSchemeProp ? colorSchemeHex : undefined}
          testID={coloredFallbackTestID}
        >
          {avatarText}
        </Box>
      );
    }, [avatarText, borderRadius, colorSchemeHex, colorSchemeProp]);

    return (
      <Box
        dangerouslySetBackground={src}
        borderRadius={borderRadius}
        borderColor={borderColor}
        width={computedSize}
        height={computedSize}
        position="relative"
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
        dangerouslySetStyle={hasBorder ? styles.border : undefined}
        flexShrink={0}
        flexGrow={0}
        testID={testID}
      >
        {shouldShowAvatarImage ? (
          <RemoteImage
            shape={shape}
            width={computedSize}
            height={computedSize}
            source={{ uri: imgSrc }}
            resizeMode="cover"
            testID={`${testID ?? ''}-image`}
          />
        ) : (
          coloredFallback
        )}
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  border: {
    borderWidth,
  },
});
