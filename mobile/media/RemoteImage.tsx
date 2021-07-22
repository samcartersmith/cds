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
import { useInvertedPaletteColor } from '../color/useInvertedPaletteColor';
import { usePalette } from '../hooks/usePalette';

interface BaseRemoteImageProps extends Omit<ImageProps, 'style' | 'width' | 'height'> {
  aspectRatio?: AspectRatio;
  height?: FixedValue;
  shape?: Shape;
  width?: FixedValue;
  /** Fill in transparent background with inverted background color and add border. This solves issue of transparent, stamped out asset icons not being visible on dark backgrounds.  */
  shouldApplyDarkModeEnhacements?: boolean;
}

interface RemoteImagePropsWithWidth extends BaseRemoteImageProps {
  width: FixedValue;
  aspectRatio: AspectRatio;
}

interface RemoteImagePropsWithHeight extends BaseRemoteImageProps {
  height: FixedValue;
  aspectRatio: AspectRatio;
}

interface RemoteImagePropsWidthAndHeight extends BaseRemoteImageProps {
  width: FixedValue;
  height: FixedValue;
  resizeMode: ImageResizeMode;
}

export type RemoteImageProps =
  | RemoteImagePropsWithWidth
  | RemoteImagePropsWithHeight
  | RemoteImagePropsWidthAndHeight;

export function getSource(source: string | number | ImageURISource): ImageSourcePropType {
  if (typeof source === 'string') {
    return { uri: source };
  }

  return source;
}

export const RemoteImage = memo(function RemoteImage({
  width,
  height,
  aspectRatio,
  shape = 'square',
  shouldApplyDarkModeEnhacements,
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

  return <Image accessibilityIgnoresInvertColors {...props} style={styles} />;
});
