import type { IllustrationVariant } from '../IllustrationNames';
import type { IllustrationBaseProps } from '../IllustrationProps';
import type { AspectRatio } from '../Shape';

import type { CardRemoteImageDimensionValue } from './CardRemoteImageProps';

export type CardMediaPlacement = 'start' | 'above' | 'end';
export type CardMediaSize = Extract<IllustrationVariant, 'spotSquare' | 'pictogram'>;
export type CardMediaIllustrationProps = IllustrationBaseProps<CardMediaSize>;
export type CardMediaIllustrationName = CardMediaIllustrationProps['name'];

export type CardMediaImageSizeObject =
  | {
      width: CardRemoteImageDimensionValue;
      height: CardRemoteImageDimensionValue;
    }
  | {
      width: CardRemoteImageDimensionValue;
      aspectRatio: AspectRatio;
    };

export type CardMediaProps = {
  /** Informs how to auto-magically size the media. */
  placement: CardMediaPlacement;
  testID?: string;
} & (
  | {
      type: 'image';
      src: string;
    }
  | {
      type: 'illustration';
      name: CardMediaIllustrationName;
    }
);
