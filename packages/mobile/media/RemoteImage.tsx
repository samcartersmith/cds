import React, { memo, useMemo } from 'react';
import {
  Image,
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
} from 'react-native';
import { SvgCssUri, SvgXml } from 'react-native-svg';
import { AspectRatio, FixedValue, RemoteImageBaseProps, useSpectrum } from '@cbhq/cds-common';
import { useShapeToBorderRadiusSize } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusSize';
import { useAvatarSize } from '@cbhq/cds-common/media/useAvatarSize';
import { getRemoteImageWidthAndHeight } from '@cbhq/cds-common/utils/getRemoteImageWidthAndHeight';

import { useInvertedPaletteColor } from '../color/useInvertedPaletteColor';
import { usePalette } from '../hooks/usePalette';
import { DangerouslySetStyle } from '../types';

type SourceProp = string | ImageProps['source'];

type XmlReturnType = { content: string };

type BaseRemoteImageProps = {
  /** Fill in transparent background with inverted background color and add border. This solves issue of transparent, stamped out asset icons not being visible on dark backgrounds.  */
  shouldApplyDarkModeEnhacements?: boolean;
  source?: SourceProp;
} & Omit<ImageProps, 'style' | 'width' | 'height' | 'source'> &
  DangerouslySetStyle<ImageStyle, false> &
  RemoteImageBaseProps;

type RemoteImagePropsWithSource = {
  source?: SourceProp;
} & BaseRemoteImageProps;

type RemoteImagePropsWithWidth = {
  width: FixedValue;
  aspectRatio: AspectRatio;
} & BaseRemoteImageProps;

type RemoteImagePropsWithHeight = {
  height: FixedValue;
  aspectRatio: AspectRatio;
} & BaseRemoteImageProps;

type RemoteImagePropsWidthAndHeight = {
  width: FixedValue;
  height: FixedValue;
  resizeMode: ImageResizeMode;
} & BaseRemoteImageProps;

export type RemoteImageProps =
  | RemoteImagePropsWithWidth
  | RemoteImagePropsWithHeight
  | RemoteImagePropsWidthAndHeight
  | RemoteImagePropsWithSource;

export function getSource(
  source: string | number | ImageURISource,
  cachePolicy?: ImageURISource['cache'],
): ImageSourcePropType {
  if (typeof source === 'string') {
    if (source.endsWith('.svg')) {
      return { uri: source, headers: { format: 'svg' }, cache: cachePolicy };
    }
    return { uri: source, cache: cachePolicy };
  }

  return source;
}

function isSvg(source: SourceProp): boolean {
  return typeof source === 'object' && 'headers' in source && source.headers?.format === 'svg';
}

export const RemoteImage = memo(function RemoteImage({
  width,
  height,
  aspectRatio,
  shape = 'square',
  shouldApplyDarkModeEnhacements,
  source,
  size = 'm',
  dangerouslySetStyle,
  borderColor,
  ...props
}: RemoteImageProps) {
  const borderRadius = useShapeToBorderRadiusSize(shape);
  const avatarSize = useAvatarSize(size);
  const spectrum = useSpectrum();

  const { width: finalWidth, height: finalHeight } = getRemoteImageWidthAndHeight({
    size,
    width,
    height,
    avatarSize,
  });

  const useFallback = source === undefined;
  const transformedSource = useMemo(
    () => (typeof source === 'string' ? getSource(source) : source),
    [source],
  );

  const palette = usePalette();
  const backgroundColor = useInvertedPaletteColor('background');

  const applyDarkModeEnhancement = spectrum === 'dark' && shouldApplyDarkModeEnhacements;

  const darkModeStyles = useMemo(() => {
    if (applyDarkModeEnhancement) {
      return {
        backgroundColor,
        borderWidth: 1,
        borderColor: palette.lineHeavy,
      };
    }
    return undefined;
  }, [applyDarkModeEnhancement, backgroundColor, palette.lineHeavy]);

  const borderStyles = useMemo(() => {
    // shouldApplyDarkModeEnhancement border decoration takes precedence
    if (!applyDarkModeEnhancement && borderColor) {
      return {
        borderColor: palette[borderColor],
        borderWidth: 2,
      };
    }

    return undefined;
  }, [applyDarkModeEnhancement, borderColor, palette]);

  const styles = useMemo(
    () =>
      [
        {
          width: finalWidth,
          height: finalHeight,
          aspectRatio: aspectRatio ? aspectRatio[0] / aspectRatio[1] : undefined,
          borderRadius,
        } as const,
        dangerouslySetStyle,
        darkModeStyles,
        borderStyles,
      ].filter(Boolean),
    [
      aspectRatio,
      borderRadius,
      borderStyles,
      dangerouslySetStyle,
      darkModeStyles,
      finalHeight,
      finalWidth,
    ],
  );

  if (isSvg(transformedSource as SourceProp)) {
    return (
      <SvgCssUri
        style={styles}
        uri={Image.resolveAssetSource(transformedSource as ImageSourcePropType).uri}
        {...props}
      />
    );
  }

  if (useFallback) {
    // eslint-disable-next-line global-require
    const darkFallback = require('./RemoteImageFallbackXmls/dark') as XmlReturnType;
    // eslint-disable-next-line global-require
    const lightFallback = require('./RemoteImageFallbackXmls/light') as XmlReturnType;

    return (
      <SvgXml
        style={styles}
        xml={spectrum === 'dark' ? darkFallback.content : lightFallback.content}
      />
    );
  }

  return (
    <Image
      accessibilityIgnoresInvertColors
      source={transformedSource as ImageSourcePropType}
      accessibilityRole="image"
      {...props}
      style={styles}
    />
  );
});
