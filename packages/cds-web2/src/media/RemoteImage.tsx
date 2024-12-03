import React, { memo, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import {
  remoteImageDarkFallbackSrc,
  remoteImageLightFallbackSrc,
} from '@cbhq/cds-common/media/remoteImageFallbackSrc';
import type { AvatarSize } from '@cbhq/cds-common/types/AvatarSize';
import type { AspectRatio, Shape } from '@cbhq/cds-common/types/Shape';

import { type PolymorphicBoxProps, Box } from '../layout/Box';

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
  aspectRatio: AspectRatio;
} & Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'className' | 'style' | 'height' | 'width' | 'source'
>;

export type RemoteImageProps<AsComponent extends React.ElementType> = PolymorphicBoxProps<
  AsComponent,
  BaseRemoteImageProps
>;

export const RemoteImage = memo(
  <AsComponent extends React.ElementType = 'img'>({
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
  }: RemoteImageProps<AsComponent>) => {
    const styles = useMemo(
      () =>
        ({
          aspectRatio: aspectRatio ? aspectRatio.join(' / ') : undefined,
          width: width ?? `var(--avatarSize-${size})`,
          height: height ?? `var(--avatarSize-${size})`,
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
        src={source}
        style={styles}
        {...props}
      />
    );
  },
);
