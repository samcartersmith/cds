import React, { memo, useMemo } from 'react';
import { css } from 'linaria';
import { useSpectrum } from '@cbhq/cds-common';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusAlias';
import { useAvatarSize } from '@cbhq/cds-common/media/useAvatarSize';
import { useAvatarSrc } from '@cbhq/cds-common/media/useAvatarSrc';
import { avatarDefaultFontColor, colorSchemeMap } from '@cbhq/cds-common/tokens/avatar';
import { compactHeight } from '@cbhq/cds-common/tokens/interactable';
import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';

import { useAccessibleForeground } from '../color/useAccessibleForeground';
import { usePaletteValueToRgbaString } from '../color/usePaletteValueToRgbaString';
import { Box } from '../layout';
import { TextBody, TextCaption, TextTitle2 } from '../typography';
import { cx } from '../utils/linaria';

import { RemoteImage } from './RemoteImage';

export const staticClassName = 'cds-avatar';
const borderWidth = 2;
export const avatarColoredFallbackClassName = 'cds-avatar-colored-fallback';

export const borderStyles = css`
  &.${staticClassName} {
    border-width: ${borderWidth}px;
  }
`;

export type AvatarWebProps = {
  /**
   * @danger Adds a className to the Avatar. If you pass in a className make sure your styles override the Avatar using the avatar class .cds-avatar like this: .my-class.cds-avatar
   */
  dangerouslySetClassName?: string;
  /** Adds treatment that indicates that the Avatar is currently selected */
  selected?: boolean;
} & AvatarBaseProps;

export const Avatar: React.FC<AvatarWebProps> = memo(
  ({
    alt,
    src,
    shape = 'circle',
    size = 'l',
    borderColor,
    dangerouslySetClassName,
    testID,
    dangerouslySetSize,
    selected,
    colorScheme: colorSchemeProp,
    name,
  }) => {
    const borderRadius = useShapeToBorderRadiusAlias(shape);
    const avatarSize = useAvatarSize(size);
    const avatarSrc = useAvatarSrc(src);
    const spectrum = useSpectrum();
    const placeholderLetter = name?.charAt(0);
    const isLargestSize = size.includes('xx');
    const isCompactAvatarButton = dangerouslySetSize && dangerouslySetSize <= compactHeight.normal;
    const isNormalAvatarButton = dangerouslySetSize && dangerouslySetSize > compactHeight.normal;

    const colorScheme = useMemo(
      () => colorSchemeMap[spectrum][colorSchemeProp ?? 'blue'],
      [spectrum, colorSchemeProp],
    );

    const colorSchemeRgb = usePaletteValueToRgbaString(colorScheme);
    const fallbackTextColor = useAccessibleForeground({
      background: colorSchemeRgb,
      color: avatarDefaultFontColor,
      usage: isLargestSize ? 'largeText' : 'normalText',
    });

    const computedSize = dangerouslySetSize ?? avatarSize;
    const shouldShowAvatarImage = src ?? !name;
    // only show a border for normal and fallback image treatments
    const hasBorder = shouldShowAvatarImage && borderColor;

    const styleOverrides = useMemo(
      () => ({
        background: colorSchemeRgb,
      }),
      [colorSchemeRgb],
    );
    const ringStyles = useMemo(
      () => ({
        boxShadow: `0 0 0 ${borderWidth}px ${colorSchemeRgb}`,
      }),
      [colorSchemeRgb],
    );

    const avatarText = useMemo(() => {
      if (isLargestSize || isNormalAvatarButton) {
        return (
          <TextTitle2 as="p" dangerouslySetColor={fallbackTextColor} align="center">
            {placeholderLetter}
          </TextTitle2>
        );
      }
      if (size === 'm' || isCompactAvatarButton) {
        return (
          <TextCaption as="p" dangerouslySetColor={fallbackTextColor} align="center">
            {placeholderLetter}
          </TextCaption>
        );
      }

      return (
        <TextBody as="p" dangerouslySetColor={fallbackTextColor} align="center">
          {placeholderLetter}
        </TextBody>
      );
    }, [
      fallbackTextColor,
      isCompactAvatarButton,
      isLargestSize,
      isNormalAvatarButton,
      placeholderLetter,
      size,
    ]);

    const coloredFallback = useMemo(() => {
      return (
        <Box
          borderRadius={borderRadius}
          flexGrow={1}
          height="100%"
          justifyContent="center"
          alignItems="center"
          dangerouslySetStyle={styleOverrides}
          dangerouslySetClassName={avatarColoredFallbackClassName}
          testID={`${testID}-fallback`}
        >
          {avatarText}
        </Box>
      );
    }, [avatarText, borderRadius, styleOverrides, testID]);

    return (
      <Box
        dangerouslySetClassName={cx(
          staticClassName,
          dangerouslySetClassName as string,
          hasBorder ? borderStyles : undefined,
        )}
        dangerouslySetStyle={selected ? ringStyles : undefined}
        dangerouslySetBackground={src}
        borderRadius={borderRadius}
        borderColor={hasBorder ? borderColor : 'transparent'}
        width={computedSize}
        height={computedSize}
        position="relative"
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        flexGrow={0}
        testID={testID}
      >
        {shouldShowAvatarImage ? (
          <RemoteImage width={computedSize} height={computedSize} source={avatarSrc} alt={alt} />
        ) : (
          coloredFallback
        )}
      </Box>
    );
  },
);
