import React, { memo, useMemo } from 'react';
import {
  Image,
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
} from 'react-native';
import { SvgCssUri } from 'react-native-svg';
import { AspectRatio, FixedValue, RemoteImageBaseProps, useSpectrum } from '@cbhq/cds-common';
import { useShapeToBorderRadiusSize } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusSize';

import { useInvertedPaletteColor } from '../color/useInvertedPaletteColor';
import { usePalette } from '../hooks/usePalette';
import { DangerouslySetStyle } from '../types';

type BaseRemoteImageProps = {
  /** Fill in transparent background with inverted background color and add border. This solves issue of transparent, stamped out asset icons not being visible on dark backgrounds.  */
  shouldApplyDarkModeEnhacements?: boolean;
} & Omit<ImageProps, 'style' | 'width' | 'height'> &
  DangerouslySetStyle<ImageStyle, false> &
  RemoteImageBaseProps;

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
  | RemoteImagePropsWidthAndHeight;

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

function isSvg(source: ImageSourcePropType): boolean {
  return typeof source === 'object' && 'headers' in source && source.headers?.format === 'svg';
}

export const RemoteImage = memo(function RemoteImage({
  width,
  height,
  aspectRatio,
  shape = 'square',
  shouldApplyDarkModeEnhacements,
  source,
  dangerouslySetStyle,
  ...props
}: RemoteImageProps) {
  const borderRadius = useShapeToBorderRadiusSize(shape);

  const spectrum = useSpectrum();
  const palette = usePalette();
  const backgroundColor = useInvertedPaletteColor('background');
  const darkModeStyles = useMemo(() => {
    if (spectrum === 'dark' && shouldApplyDarkModeEnhacements) {
      return {
        backgroundColor,
        borderWidth: 1,
        borderColor: palette.lineHeavy,
      };
    }
    return undefined;
  }, [backgroundColor, palette, shouldApplyDarkModeEnhacements, spectrum]);

  const styles = useMemo(
    () =>
      [
        {
          width,
          height,
          aspectRatio: aspectRatio ? aspectRatio[0] / aspectRatio[1] : undefined,
          borderRadius,
        } as const,
        dangerouslySetStyle,
        darkModeStyles,
      ].filter(Boolean),
    [aspectRatio, borderRadius, dangerouslySetStyle, darkModeStyles, height, width],
  );

  if (isSvg(source)) {
    return <SvgCssUri style={styles} uri={Image.resolveAssetSource(source).uri} {...props} />;
  }

  return <Image accessibilityIgnoresInvertColors source={source} {...props} style={styles} />;
});
