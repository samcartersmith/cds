import React, { memo } from 'react';

import { defaultMediaDimension, defaultMediaSize } from '../tokens/card';
import type { IllustrationPropsDiscriminatedUnion } from '../types';
import type {
  CardMediaImageSizeObject,
  CardMediaPlacement,
  CardMediaProps,
  CardRemoteImageProps,
} from '../types/alpha';

type CreateCardMediaParams = {
  Illustration: React.ComponentType<React.PropsWithChildren<IllustrationPropsDiscriminatedUnion>>;
  CardRemoteImage: React.ComponentType<React.PropsWithChildren<CardRemoteImageProps>>;
};

export function createCardMedia({ Illustration, CardRemoteImage }: CreateCardMediaParams) {
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

  const CardMedia = memo(function CardMedia(props: CardMediaProps) {
    if (props.type === 'spotSquare') {
      return (
        <Illustration
          type="spotSquare"
          dimension={defaultMediaDimension}
          name={props.name}
          testID={props.testID}
          alt={props.alt ?? ''}
        />
      );
    }

    if (props.type === 'pictogram') {
      return (
        <Illustration
          type="pictogram"
          dimension={defaultMediaDimension}
          name={props.name}
          testID={props.testID}
          alt={props.alt ?? ''}
        />
      );
    }
    if (props.type === 'image') {
      return (
        <CardRemoteImage
          src={props.src}
          testID={props.testID}
          alt={props.alt ?? ''}
          {...imageProps[props.placement]}
        />
      );
    }
    return null;
  });

  CardMedia.displayName = 'CardMedia';
  return CardMedia;
}
