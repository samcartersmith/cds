import { illustrationDimensions } from '../tokens/illustrations';

export type HeroSquareDimension = (typeof illustrationDimensions.heroSquare)[number];
export type SpotSquareDimension = (typeof illustrationDimensions.spotSquare)[number];
export type SpotRectangleDimension = (typeof illustrationDimensions.spotRectangle)[number];
export type PictogramDimension = (typeof illustrationDimensions.pictogram)[number];
export type SpotIconDimension = (typeof illustrationDimensions.spotIcon)[number];

export type IllustrationDimension =
  | HeroSquareDimension
  | SpotSquareDimension
  | SpotRectangleDimension
  | PictogramDimension
  | SpotIconDimension;
