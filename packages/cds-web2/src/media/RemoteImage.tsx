import React, { memo, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import {
  remoteImageDarkFallbackSrc,
  remoteImageLightFallbackSrc,
} from '@cbhq/cds-common/media/remoteImageFallbackSrc';
import type { AvatarSize } from '@cbhq/cds-common/types/AvatarSize';
import type { AspectRatio, Shape } from '@cbhq/cds-common/types/Shape';

import { type BoxProps, Box } from '../layout/Box';
import { StyleProps } from '../styles/styleProps';

const baseStyle = css`
  display: block;
`;

const resizeStyle = {
  cover: css`
    object-fit: cover;
  `,
  contain: css`
    object-fit: contain;
  `,
};

const hexagonOverflowClass = css`
  overflow: visible;
`;

const fallbackStyle = css`
  background-image: url(${remoteImageLightFallbackSrc});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media (prefers-color-scheme: dark) {
    background-image: url(${remoteImageDarkFallbackSrc});
  }
`;

const borderRadiusStyle = {
  circle: css`
    border-radius: 1e5px;
  `,
  squircle: css`
    border-radius: 8px;
  `,
  square: css`
    border-radius: 4px;
  `,
  rectangle: css`
    border-radius: 0;
  `,
  hexagon: css`
    border-radius: 0;
  `,
};

type BaseRemoteImageProps = {
  /** Absolute url to the image that should be shown in the RemoteImage. If no source is provided then a generic fallback image is used. */
  source?: string;
  resizeMode?: keyof typeof resizeStyle;
  /**
   * Shape of RemoteImage
   * @default square
   * */
  shape?: Shape;
  /**
   * Size for a given RemoteImage. If width or height is not defined,
   * it will set size = m as default
   *
   * @default m
   * */
  size?: AvatarSize;
  aspectRatio?: AspectRatio;
} & Omit<BoxProps<'img'>, 'aspectRatio'>;

type RemoteImagePropsWithWidth = {
  width: StyleProps['width'];
  aspectRatio: AspectRatio;
} & BaseRemoteImageProps;

type RemoteImagePropsWithHeight = {
  height: StyleProps['height'];
  aspectRatio: AspectRatio;
} & BaseRemoteImageProps;

type RemoteImagePropsWidthAndHeight = {
  width: StyleProps['width'];
  height: StyleProps['height'];
} & BaseRemoteImageProps;

type RemoteImagePropsSize = {
  size: AvatarSize;
} & BaseRemoteImageProps;

export type RemoteImageProps =
  | RemoteImagePropsWithWidth
  | RemoteImagePropsWithHeight
  | RemoteImagePropsWidthAndHeight
  | RemoteImagePropsSize;

export const RemoteImage = memo(
  ({
    width,
    height,
    aspectRatio,
    shape = 'square',
    source,
    alt = '',
    className,
    resizeMode = 'cover',
    size = 'm',
    borderColor,
    borderWidth = borderColor ? 200 : undefined,
    style,
    ...props
  }: RemoteImageProps) => {
    const styles = useMemo(
      () =>
        ({
          aspectRatio: aspectRatio ? aspectRatio.join(' / ') : undefined,
          ...(!width && { width: `var(--avatarSize-${size})` }),
          ...(!height && { height: `var(--avatarSize-${size})` }),
          ...style,
        } as const),
      [aspectRatio, height, size, style, width],
    );

    return (
      <Box
        alt={alt}
        as="img"
        borderColor={borderColor}
        borderWidth={borderWidth}
        className={cx(
          baseStyle,
          shape === 'hexagon' && hexagonOverflowClass,
          resizeStyle[resizeMode],
          borderRadiusStyle[shape],
          !source && fallbackStyle,
          className,
        )}
        height={height}
        src={source}
        style={styles}
        width={width}
        {...props}
      />
    );
  },
);
