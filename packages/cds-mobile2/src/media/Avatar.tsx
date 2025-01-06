import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common2/hooks/useShapeToBorderRadiusAlias';
import { useAvatarSrc } from '@cbhq/cds-common2/media/useAvatarSrc';
import { colorSchemeMap } from '@cbhq/cds-common2/tokens/avatar';
import { interactableHeight } from '@cbhq/cds-common2/tokens/interactableHeight';
import { AvatarBaseProps } from '@cbhq/cds-common2/types/AvatarBaseProps';
import { avatarSizeMap } from '@cbhq/cds-common2/types/AvatarSize';
import { getAccessibleColor } from '@cbhq/cds-common2/utils/getAccessibleColor';

import { Box } from '../layout';
import { useTheme } from '../system/ThemeProvider';
import { TextBody, TextCaption, TextTitle2 } from '../typography';

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
    const avatarSize = avatarSizeMap[size];
    const imgSrc = useAvatarSrc(src);
    const theme = useTheme();
    const placeholderLetter = name?.charAt(0);
    const isLargestSize = size.includes('xx');
    const isCompactAvatarButton =
      dangerouslySetSize && dangerouslySetSize <= interactableHeight.regular;
    const isNormalAvatarButton =
      dangerouslySetSize && dangerouslySetSize > interactableHeight.regular;

    const colorScheme = colorSchemeMap[colorSchemeProp ?? 'blue'];
    const colorSchemeHex = theme.spectrum[colorScheme];
    const fallbackTextColor = getAccessibleColor(colorSchemeHex);

    const computedSize = dangerouslySetSize ?? avatarSize;
    const shouldShowAvatarImage = !!src || !name;
    // only show a border for normal and fallback image treatments
    const hasBorder = shouldShowAvatarImage && borderColor && shape !== 'hexagon';

    const avatarText = useMemo(() => {
      if (isLargestSize || isNormalAvatarButton) {
        return (
          <TextTitle2 align="center" dangerouslySetColor={fallbackTextColor} transform="uppercase">
            {placeholderLetter}
          </TextTitle2>
        );
      }
      if (size === 'm' || isCompactAvatarButton) {
        return (
          <TextCaption align="center" dangerouslySetColor={fallbackTextColor} transform="uppercase">
            {placeholderLetter}
          </TextCaption>
        );
      }

      return (
        <TextBody align="center" dangerouslySetColor={fallbackTextColor} transform="uppercase">
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
        flexGrow={0}
        flexShrink={0}
        height={computedSize}
        justifyContent="center"
        overflow="hidden"
        position="relative"
        style={hasBorder ? styles.border : undefined}
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
