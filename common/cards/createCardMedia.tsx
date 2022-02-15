import React, { memo } from 'react';
import { SetOptional } from 'type-fest';
import type { CardRemoteImageProps, CardVariant, IllustrationBaseProps } from '../types';
import { illustrationDimensionDefaults } from '../tokens/illustrations';
import { cardVariantMediaDefaults } from '../tokens/card';

type CreateCardMediaParams = {
  Illustration: React.ComponentType<CardIllustrationProps>;
  CardRemoteImage: React.ComponentType<CardRemoteImageProps>;
};

export type CardMediaType = 'image' | 'illustration';
export type CardIllustrationProps = IllustrationBaseProps<'all'>;

type CardMediaImageProps = {
  type: 'image';
} & SetOptional<CardRemoteImageProps, 'size'>;

type CardMediaIllustrationProps = {
  type: 'illustration';
} & CardIllustrationProps;

export type CardMediaProps = {
  /** Will auto-magically size the media based on this prop. Internally each variant is mapped to a size from one of the CDS Illustration components. */
  variant: CardVariant;
} & (CardMediaImageProps | CardMediaIllustrationProps);

export function createCardMedia({ Illustration, CardRemoteImage }: CreateCardMediaParams) {
  const CardMedia = memo(function CardMedia(props: CardMediaProps) {
    const illustrationVariant = cardVariantMediaDefaults[props.variant];

    if (props.type === 'illustration') {
      return (
        <Illustration
          dimension={props.dimension ?? illustrationDimensionDefaults[illustrationVariant]}
          name={props.name}
          testID={props.testID}
          scaleMultiplier={props.scaleMultiplier}
        />
      );
    }
    if (props.type === 'image') {
      return (
        <CardRemoteImage
          size={props.size ?? illustrationVariant}
          src={props.src}
          testID={props.testID}
        />
      );
    }
    return null;
  });

  CardMedia.displayName = 'CardMedia';
  return CardMedia;
}
