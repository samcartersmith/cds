import React, { memo, useMemo } from 'react';
import { css } from 'linaria';
import { useSpectrum } from '@cbhq/cds-common';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusAlias';
import { useAvatarSize } from '@cbhq/cds-common/media/useAvatarSize';
import { useAvatarSrc } from '@cbhq/cds-common/media/useAvatarSrc';
import { avatarDefaultFontColor, colorSchemeMap } from '@cbhq/cds-common/tokens/avatar';
import { interactableHeight } from '@cbhq/cds-common/tokens/interactableHeight';
import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';

import { useAccessibleForeground } from '../color/useAccessibleForeground';
import { usePaletteValueToRgbaString } from '../color/usePaletteValueToRgbaString';
import { Box } from '../layout';
import { TextBody, TextCaption, TextTitle2 } from '../typography';
import { cx } from '../utils/linaria';

import { HexagonBorder, hexagonStyles, staticHexagonClassName } from './Hexagon';
import { RemoteImage } from './RemoteImage';

export const staticClassName = 'cds-avatar';
export const avatarColoredFallbackClassName = 'cds-avatar-colored-fallback';
const borderWidth = 2;

const borderStyles = css`
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

export const Avatar = memo(
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
  }: AvatarWebProps) => {
    const borderRadius = useShapeToBorderRadiusAlias(shape);
    const avatarSize = useAvatarSize(size);
    const avatarSrc = useAvatarSrc(src);
    const spectrum = useSpectrum();
    const placeholderLetter = name?.charAt(0);
    const isLargestSize = size.includes('xx');
    const isCompactAvatarButton =
      dangerouslySetSize && dangerouslySetSize <= interactableHeight.xSmall.regular;
    const isNormalAvatarButton =
      dangerouslySetSize && dangerouslySetSize > interactableHeight.xSmall.regular;

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
    const shouldShowAvatarImage = !!src || !name;
    // only show a border for normal and fallback image treatments
    const hasBorder = shouldShowAvatarImage && borderColor && shape !== 'hexagon';

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

    const boxOverflow = useMemo(() => (shape !== 'hexagon' ? 'hidden' : undefined), [shape]);

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

    const isHexagon = shape === 'hexagon';

    const hexagonClassName = useMemo(() => {
      if (isHexagon) {
        return `${hexagonStyles} ${staticHexagonClassName}`;
      }
      return undefined;
    }, [isHexagon]);

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

    const dangerouslySetBackground = useMemo(() => {
      if (src) {
        return src;
      }
      if (!src && isHexagon) {
        return !colorSchemeProp ? 'transparent' : colorSchemeRgb;
      }
      return undefined;
    }, [colorSchemeProp, colorSchemeRgb, isHexagon, src]);

    return (
      <Box position="relative">
        <Box
          dangerouslySetClassName={cx(
            staticClassName,
            dangerouslySetClassName as string,
            hasBorder ? borderStyles : undefined,
            hexagonClassName,
          )}
          dangerouslySetStyle={selected && !isHexagon ? ringStyles : undefined}
          dangerouslySetBackground={dangerouslySetBackground}
          borderRadius={borderRadius}
          borderColor={hasBorder ? borderColor : 'transparent'}
          width={computedSize}
          height={computedSize}
          position="relative"
          overflow={boxOverflow}
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          flexGrow={0}
          testID={testID}
        >
          {shouldShowAvatarImage ? (
            <RemoteImage
              shape={shape}
              width={computedSize}
              height={computedSize}
              source={avatarSrc}
              alt={alt}
            />
          ) : (
            coloredFallback
          )}
        </Box>
        {isHexagon && selected && <HexagonBorder strokeColor={colorSchemeRgb} offset size={size} />}
        {isHexagon && borderColor && (
          <HexagonBorder strokeColor={`var(--${borderColor})`} size={size} />
        )}
      </Box>
    );
  },
);
