import React, { memo, useMemo } from 'react';

import { Shape } from '@cbhq/cds-common';
import { borderRadius as borderRadii } from '@cbhq/cds-common/tokens/border';
import { Image, ImageProps, ImageResizeMode } from 'react-native';

type Size = number | string;

interface BaseRemoteImageProps extends Omit<ImageProps, 'style' | 'width' | 'height'> {
  aspectRatio?: number;
  height?: Size;
  shape?: Shape;
  width?: Size;
}

interface RemoteImagePropsWithWidth extends BaseRemoteImageProps {
  width: Size;
  aspectRatio: number;
}

interface RemoteImagePropsWithHeight extends BaseRemoteImageProps {
  height: Size;
  aspectRatio: number;
}

interface RemoteImagePropsWidthAndHeight extends BaseRemoteImageProps {
  width: Size;
  height: Size;
  resizeMode: ImageResizeMode;
}

export type RemoteImageProps =
  | RemoteImagePropsWithWidth
  | RemoteImagePropsWithHeight
  | RemoteImagePropsWidthAndHeight;

export const RemoteImage = memo(function RemoteImage({
  width,
  height,
  aspectRatio,
  shape = 'square',
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

  const styles = useMemo(
    () =>
      ({
        width,
        height,
        aspectRatio,
        borderRadius,
      } as const),
    [aspectRatio, borderRadius, height, width]
  );

  return <Image accessibilityIgnoresInvertColors {...props} style={styles} />;
});
