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
const staticHexagonClassName = 'cds-hexagon';
const borderWidth = 2;
export const avatarColoredFallbackClassName = 'cds-avatar-colored-fallback';

export const borderStyles = css`
  &.${staticClassName} {
    border-width: ${borderWidth}px;
  }
`;

export const hexagonStyles = css`
  &.${staticHexagonClassName} {
    clip-path: url(#hex-hw-shapeclip-clipconfig);
    --webkit-clip-path: url(#hex-hw-shapeclip-clipconfig);
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

export const HexagonClipPath = () => {
  // to get scale values use equation 1/x, where x is height or width. for this case 1/66 and 1/62
  return (
    <svg height="0" viewBox="0 0 66 62" width="0">
      <defs>
        <clipPath
          id="hex-hw-shapeclip-clipconfig"
          clipPathUnits="objectBoundingBox"
          transform="scale(0.01515151515 0.01612903225)"
        >
          <path d="M63.4372 22.8624C66.2475 27.781 66.2475 33.819 63.4372 38.7376L54.981 53.5376C52.1324 58.5231 46.8307 61.6 41.0887 61.6H24.4562C18.7142 61.6 13.4125 58.5231 10.564 53.5376L2.10774 38.7376C-0.702577 33.819 -0.702582 27.781 2.10774 22.8624L10.564 8.06243C13.4125 3.07687 18.7142 0 24.4562 0H41.0887C46.8307 0 52.1324 3.07686 54.981 8.06242L63.4372 22.8624Z" />
        </clipPath>
      </defs>
    </svg>
  );
};

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
          <RemoteImage width={computedSize} height={computedSize} source={avatarSrc} alt={alt} />
        ) : (
          coloredFallback
        )}
        {isHexagon && <HexagonClipPath />}
      </Box>
    );
  },
);
