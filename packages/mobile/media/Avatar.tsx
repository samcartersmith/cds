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
          <TextTitle2 align="center" dangerouslySetColor={fallbackTextColor}>
            {placeholderLetter}
          </TextTitle2>
        );
      }
      if (size === 'm' || isCompactAvatarButton) {
        return (
          <TextCaption align="center" dangerouslySetColor={fallbackTextColor}>
            {placeholderLetter}
          </TextCaption>
        );
      }

      return (
        <TextBody align="center" dangerouslySetColor={fallbackTextColor}>
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
          alignItems="center"
          borderRadius={borderRadius}
          dangerouslySetBackground={colorSchemeProp ? colorSchemeHex : undefined}
          height="100%"
          justifyContent="center"
          testID={coloredFallbackTestID}
          width="100%"
        >
          {avatarText}
        </Box>
      );
    }, [avatarText, borderRadius, colorSchemeHex, colorSchemeProp]);

    return (
      <Box
        alignItems="center"
        borderColor={borderColor}
        borderRadius={borderRadius}
        dangerouslySetBackground={src}
        dangerouslySetStyle={hasBorder ? styles.border : undefined}
        flexGrow={0}
        flexShrink={0}
        height={computedSize}
        justifyContent="center"
        overflow="hidden"
        position="relative"
        testID={testID}
        width={computedSize}
      >
        {shouldShowAvatarImage ? (
          <RemoteImage
            height={computedSize}
            resizeMode="cover"
            shape={shape}
            source={{ uri: imgSrc }}
            testID={`${testID ?? ''}-image`}
            width={computedSize}
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
