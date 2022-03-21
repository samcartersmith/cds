import React, { memo, useMemo } from 'react';
import { css } from 'linaria';
import { AspectRatio, FixedValue, Shape, SharedProps } from '@cbhq/cds-common';
import { useShapeToBorderRadiusSize } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusSize';

import { cx } from '../utils/linaria';

const resizeModes = {
  cover: css`
    && {
      object-fit: cover;
    }
  `,
  contain: css`
    && {
      object-fit: contain;
    }
  `,
};

const image = css`
  && {
    display: block;
  }
`;

const imageRatio = css`
  && {
    aspect-ratio: var(--image-aspect-ratio);
  }
`;

type BaseRemoteImageProps = {
  aspectRatio?: AspectRatio;
  height?: FixedValue;
  shape?: Shape;
  width?: FixedValue;
  alt?: string;
  source: string;
  dangerouslySetClassName?: string;
  resizeMode?: keyof typeof resizeModes;
} & Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'className' | 'style' | 'height' | 'width' | 'source'
> &
  SharedProps;

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
  alt,
  dangerouslySetClassName,
  resizeMode = 'cover',
  testID,
  ...props
}: RemoteImageProps) {
  const borderRadius = useShapeToBorderRadiusSize(shape);

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
      data-testid={testID}
      alt={alt ?? ''}
      {...props}
      src={source}
      width={width}
      height={height}
      className={cx(
        image,
        aspectRatio && imageRatio,
        resizeModes[resizeMode],
        dangerouslySetClassName,
      )}
      style={styles}
    />
  );
});
