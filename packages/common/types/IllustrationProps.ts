import { illustrationDimensions } from '../tokens/illustrations';

import {
  IllustrationHeroSquareNames,
  IllustrationPictogramNames,
  IllustrationSpotRectangleNames,
  IllustrationSpotSquareNames,
} from './IllustrationNames';
import { SharedProps } from './SharedProps';

export type ReleasedIllustrationsTypes = {
  newIllustrations: string[];
  modifiedIllustrations: string[];
  deletedIllustrations: string[];
};

export type IllustrationNames =
  | IllustrationHeroSquareNames
  | IllustrationSpotRectangleNames
  | IllustrationPictogramNames
  | IllustrationSpotSquareNames;

export type IllustrationNamesMap = {
  all: IllustrationNames;
  heroSquare: IllustrationHeroSquareNames;
  spotRectangle: IllustrationSpotRectangleNames;
  pictogram: IllustrationPictogramNames;
  spotSquare: IllustrationSpotSquareNames;
};

type HeroSquareDimension = typeof illustrationDimensions.heroSquare[number];
type SpotSquareDimension = typeof illustrationDimensions.spotSquare[number];
type SpotRectangleDimension = typeof illustrationDimensions.spotRectangle[number];
type PictogramDimension = typeof illustrationDimensions.pictogram[number];

export type IllustrationDimension =
  | HeroSquareDimension
  | SpotSquareDimension
  | SpotRectangleDimension
  | PictogramDimension;

export type IllustrationDimensionsMap = {
  all: IllustrationDimension;
  heroSquare: HeroSquareDimension;
  spotSquare: SpotSquareDimension;
  spotRectangle: SpotRectangleDimension;
  pictogram: PictogramDimension;
};

export type IllustrationBaseProps<T extends keyof IllustrationNamesMap> = {
  /** Name of illustration as defined in Figma */
  name: IllustrationNamesMap[T];
  /**
   * Size of illustration given that the size constraint is available in Figma
   * @default pictogram - 48x48, heroSquare - 240x240, spotRectangle - 240x120, spotSquare 120x120
   */
  dimension?: IllustrationDimensionsMap[T];
  /** Multiply the width & height while maintaining aspect ratio */
  scaleMultiplier?: number;
} & SharedProps;

export type HeroSquareProps = IllustrationBaseProps<'heroSquare'>;

export type SpotSquareProps = IllustrationBaseProps<'spotSquare'>;

export type PictogramProps = IllustrationBaseProps<'pictogram'>;

export type SpotRectangleProps = IllustrationBaseProps<'spotRectangle'>;
