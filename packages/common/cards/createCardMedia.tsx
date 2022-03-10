import React, { memo } from 'react';

import { defaultMediaDimension,defaultMediaSize } from '../tokens/card';
import type {
  CardMediaIllustrationProps,
  CardMediaImageSizeObject,
  CardMediaPlacement,
  CardMediaProps,
  CardRemoteImageProps,
} from '../types/alpha';

type CreateCardMediaParams = {
  Illustration: React.ComponentType<CardMediaIllustrationProps>;
  CardRemoteImage: React.ComponentType<CardRemoteImageProps>;
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
    if (props.type === 'illustration') {
      return (
        <Illustration dimension={defaultMediaDimension} name={props.name} testID={props.testID} />
      );
    }
    if (props.type === 'image') {
      return (
        <CardRemoteImage src={props.src} testID={props.testID} {...imageProps[props.placement]} />
      );
    }
    return null;
  });

  CardMedia.displayName = 'CardMedia';
  return CardMedia;
}
