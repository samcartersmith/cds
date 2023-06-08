import { illustrationDimensions } from '../tokens/illustrations';

import type {
  IllustrationHeroSquareNames,
  IllustrationPictogramNames,
  IllustrationSpotRectangleNames,
  IllustrationSpotSquareNames,
  IllustrationVariant,
} from './IllustrationNames';
import type { SharedProps } from './SharedProps';

export type IllustrationNames = HeroSquareName | SpotSquareName | SpotRectangleName | PictogramName;

export type HeroSquareName = IllustrationHeroSquareNames;
export type PictogramName = IllustrationPictogramNames;
export type SpotRectangleName = IllustrationSpotRectangleNames;
export type SpotSquareName = IllustrationSpotSquareNames;
export type IllustrationType = IllustrationVariant;

export type IllustrationNamesMap = {
  heroSquare: HeroSquareName;
  spotRectangle: SpotRectangleName;
  pictogram: PictogramName;
  spotSquare: SpotSquareName;
};

type HeroSquareDimension = (typeof illustrationDimensions.heroSquare)[number];
type SpotSquareDimension = (typeof illustrationDimensions.spotSquare)[number];
type SpotRectangleDimension = (typeof illustrationDimensions.spotRectangle)[number];
type PictogramDimension = (typeof illustrationDimensions.pictogram)[number];

export type IllustrationDimension =
  | HeroSquareDimension
  | SpotSquareDimension
  | SpotRectangleDimension
  | PictogramDimension;

export type IllustrationDimensionsMap = {
  heroSquare: HeroSquareDimension;
  spotSquare: SpotSquareDimension;
  spotRectangle: SpotRectangleDimension;
  pictogram: PictogramDimension;
};

export type IllustrationBaseProps<T extends keyof IllustrationNamesMap> = {
  /** Name of illustration as defined in Figma */
  name: IllustrationNamesMap[T];
  /**
   * HeroSquare Default:  240x240
   * SpotSquare Default: 96x96
   * Pictogram Default: 48x48
   * SpotRectangle Default: 240x120
   *
   */
  dimension?: IllustrationDimensionsMap[T];
  /** Multiply the width & height while maintaining aspect ratio */
  scaleMultiplier?: number;
  /**
   * Fallback element to render if unable to find an illustration with the matching name
   * @default null
   * */
  fallback?: null | React.ReactElement;
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
   * @default 96x96
   * */
  dimension?: IllustrationDimensionsMap['spotSquare'];
};

export type PictogramProps = IllustrationBaseProps<'pictogram'> & {
  /**
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

export type IllustrationPropsDiscriminatedUnion =
  | ({
      type: 'heroSquare';
    } & HeroSquareProps)
  | ({
      type: 'spotSquare';
    } & SpotSquareProps)
  | ({
      type: 'spotRectangle';
    } & SpotRectangleProps)
  | ({
      type: 'pictogram';
    } & PictogramProps);
