import React, { memo, useMemo } from 'react';

import { AspectRatio, FixedValue, Shape, useSpectrum } from '@cbhq/cds-common';
import { borderRadius as borderRadii } from '@cbhq/cds-common/tokens/border';
import {
  Image,
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
  ImageURISource,
} from 'react-native';
import { SvgCssUri } from 'react-native-svg';

import { useInvertedPaletteColor } from '../color/useInvertedPaletteColor';
import { usePalette } from '../hooks/usePalette';

type BaseRemoteImageProps = {
  aspectRatio?: AspectRatio;
  height?: FixedValue;
  shape?: Shape;
  width?: FixedValue;
  /** Fill in transparent background with inverted background color and add border. This solves issue of transparent, stamped out asset icons not being visible on dark backgrounds.  */
  shouldApplyDarkModeEnhacements?: boolean;
} & Omit<ImageProps, 'style' | 'width' | 'height'>;

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

export function getSource(source: string | number | ImageURISource): ImageSourcePropType {
  if (typeof source === 'string') {
    if (source.endsWith('.svg')) {
      return { uri: source, headers: { format: 'svg' } };
    }
    return { uri: source };
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
  ...props
}: RemoteImageProps) {
  const borderRadius = useMemo(() => {
    switch (shape) {
      case 'squircle':
        return borderRadii.standard;
      case 'circle':
        if (typeof height === 'number') {
          return height;
        }
        if (typeof width === 'number') {
          return width;
        }
        return 0;
      default:
        return 0;
    }
  }, [shape, height, width]);

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
        darkModeStyles,
      ].filter(Boolean),
    [aspectRatio, borderRadius, darkModeStyles, height, width],
  );

  if (isSvg(source)) {
    return <SvgCssUri style={styles} uri={Image.resolveAssetSource(source).uri} {...props} />;
  }

  return <Image accessibilityIgnoresInvertColors source={source} {...props} style={styles} />;
});
