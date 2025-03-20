import React, { memo } from 'react';

import {
  defaultMediaDimension,
  defaultMediaSize,
  defaultPictogramMediaDimension,
} from '../tokens/card';
import type {
  CardMediaImageSizeObject,
  CardMediaPlacement,
  CardMediaProps,
  CardRemoteImageProps,
  PictogramProps,
  SpotSquareProps,
} from '../types';

type CreateCardMediaParams = {
  SpotSquare: React.ComponentType<React.PropsWithChildren<SpotSquareProps>>;
  Pictogram: React.ComponentType<React.PropsWithChildren<PictogramProps>>;
  CardRemoteImage: React.ComponentType<React.PropsWithChildren<CardRemoteImageProps>>;
};

/**
 * @deprecated do not use creator patterns in CDS components
 */
export function createCardMedia({ SpotSquare, Pictogram, CardRemoteImage }: CreateCardMediaParams) {
  const imageProps: Record<CardMediaPlacement, CardMediaImageSizeObject> = {
    start: {
      width: '50%',
      height: '100%',
    },
    above: {
      width: '100%',
      aspectRatio: [2, 1],
    },
    end: defaultMediaSize,
  };

  const CardMedia = memo(function CardMedia({ placement = 'end', ...props }: CardMediaProps) {
    if (props.type === 'spotSquare') {
      return (
        <SpotSquare
          {...props}
          dimension={defaultMediaDimension}
          name={props.name}
          testID={props.testID}
        />
      );
    }

    if (props.type === 'pictogram') {
      return (
        <Pictogram
          {...props}
          dimension={defaultPictogramMediaDimension}
          name={props.name}
          testID={props.testID}
        />
      );
    }
    if (props.type === 'image') {
      return (
        <CardRemoteImage
          alt={props.alt ?? ''}
          src={props.src}
          testID={props.testID}
          {...imageProps[placement]}
        />
      );
    }
    return null;
  });

  CardMedia.displayName = 'CardMedia';
  return CardMedia;
}
