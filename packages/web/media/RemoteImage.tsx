import React, { memo, useMemo } from 'react';
import { css } from 'linaria';
import {
  AspectRatio,
  AvatarSize,
  FixedValue,
  RemoteImageBaseProps,
  SharedProps,
} from '@cbhq/cds-common';
import { useShapeToBorderRadiusSize } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusSize';
import { useAvatarSize } from '@cbhq/cds-common/media/useAvatarSize';
import { getRemoteImageWidthAndHeight } from '@cbhq/cds-common/utils/getRemoteImageWidthAndHeight';

import { palette } from '../tokens';
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
  alt?: string;
  source: string;
  dangerouslySetClassName?: string;
  resizeMode?: keyof typeof resizeModes;
} & Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'className' | 'style' | 'height' | 'width' | 'source'
> &
  SharedProps &
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
} & BaseRemoteImageProps;

type RemoteImagePropsSize = {
  size: AvatarSize;
} & BaseRemoteImageProps;

export type RemoteImageProps =
  | RemoteImagePropsWithWidth
  | RemoteImagePropsWithHeight
  | RemoteImagePropsWidthAndHeight
  | RemoteImagePropsSize;

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
  size,
  borderColor,
  ...props
}: BaseRemoteImageProps) {
  const borderRadius = useShapeToBorderRadiusSize(shape);
  const avatarSize = useAvatarSize(size ?? 'm');

  const { width: finalWidth, height: finalHeight } = getRemoteImageWidthAndHeight({
    size,
    width,
    height,
    avatarSize,
  });

  const styles = useMemo(
    () =>
      ({
        borderRadius,
        '--image-aspect-ratio': aspectRatio ? aspectRatio.join(' / ') : undefined,
        border: borderColor ? `1px solid ${palette[borderColor]}` : undefined,
      } as const),
    [aspectRatio, borderColor, borderRadius],
  );

  return (
    <img
      data-testid={testID}
      alt={alt ?? ''}
      {...props}
      src={source}
      width={finalWidth}
      height={finalHeight}
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
