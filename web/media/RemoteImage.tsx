import React, { memo, useMemo } from 'react';

import { AspectRatio, FixedValue, Shape } from '@cbhq/cds-common';
import { borderRadius as borderRadii } from '@cbhq/cds-common/tokens/border';
import { cx, css } from 'linaria';

const image = css`
  display: block;
  object-fit: cover;
`;

const imageRatio = css`
  aspect-ratio: var(--image-aspect-ratio);
`;

type BaseRemoteImageProps = {
  aspectRatio?: AspectRatio;
  height?: FixedValue;
  shape?: Shape;
  width?: FixedValue;
  source: string;
} & Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'className' | 'style' | 'height' | 'width' | 'source'
>;

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
} & BaseRemoteImageProps;

export type RemoteImageProps =
  | RemoteImagePropsWithWidth
  | RemoteImagePropsWithHeight
  | RemoteImagePropsWidthAndHeight;

export const RemoteImage = memo(function RemoteImage({
  width,
  height,
  aspectRatio,
  shape = 'square',
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

  const styles = useMemo(
    () =>
      ({
        borderRadius,
        '--image-aspect-ratio': aspectRatio ? aspectRatio.join(' / ') : undefined,
      } as const),
    [aspectRatio, borderRadius],
  );

  return (
    <img
      alt=""
      {...props}
      src={source}
      width={width}
      height={height}
      className={cx(image, aspectRatio && imageRatio)}
      style={styles}
    />
  );
});
