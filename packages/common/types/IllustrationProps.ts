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
  /** @deprecated spotSquare size 120x120 is deprecated. Use size 96x96 */
  spotSquare: SpotSquareDimension;
  spotRectangle: SpotRectangleDimension;
  /** @deprecated pictogram size 96x96 is deprecated. Use size 64x64 */
  pictogram: PictogramDimension;
};

export type IllustrationBaseProps<T extends keyof IllustrationNamesMap> = {
  /** Name of illustration as defined in Figma */
  name: IllustrationNamesMap[T];
  /**
   * @deprecated
   * The prop itself is not deprecated, but some of the sizes are.
   *
   * HeroSquare Default:  240x240
   * SpotSquare Default: 120x120 (120x120 is being deprecated. Please use
   * 96x96 instead. The default size of SpotSquare will be 96x96 in the next
   * major release)
   * Pictogram Default: 48x48. The size 96x96 is soon to be deprecated. Please
   * use 64x64 instead.
   * SpotRectangle Default: 240x120
   *
   */
  dimension?: IllustrationDimensionsMap[T];
  /** Multiply the width & height while maintaining aspect ratio */
  scaleMultiplier?: number;
} & SharedProps;

export type HeroSquareProps = IllustrationBaseProps<'heroSquare'> & {
  /**
   * HeroSquare dimensions.
   * @default  240x240
   * */
  dimension?: IllustrationDimensionsMap['heroSquare'];
};

export type SpotSquareProps = IllustrationBaseProps<'spotSquare'> & {
  /**
   * @deprecated SpotSquare dimensions. The prop itself is not deprecated, but
   * the size 120x120 is deprecated in SpotSquare. Please use 96x96 instead.
   * The default size of SpotSquare will be 96x96 it the next major release.
   * @default 120x120
   * */
  dimension?: IllustrationDimensionsMap['spotSquare'];
};

export type PictogramProps = IllustrationBaseProps<'pictogram'> & {
  /**
   * @deprecated Pictogram dimensions. The prop itself is not deprecated, but
   * the size 96x96 is deprecated. Please use 64x64 instead.
   * @default 48x48
   * */
  dimension?: IllustrationDimensionsMap['pictogram'];
};

export type SpotRectangleProps = IllustrationBaseProps<'spotRectangle'> & {
  /**
   * SpotRectangle dimensions
   * @default 240x120
   * */
  dimension?: IllustrationDimensionsMap['spotRectangle'];
};
