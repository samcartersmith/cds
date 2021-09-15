import { illustrationSizes } from '../tokens/illustrations';
import {
  IllustrationHeroSquareNames,
  IllustrationSpotRectangleNames,
  IllustrationPictogramNames,
  IllustrationSpotSquareNames,
  IllustrationVariant,
} from './IllustrationNames';
import { SharedProps } from './SharedProps';

type IllustrationNames =
  | IllustrationHeroSquareNames
  | IllustrationSpotRectangleNames
  | IllustrationPictogramNames
  | IllustrationSpotSquareNames;

export type IllustrationBaseProps = {
  name: IllustrationNames;
  /** @internal Do not use! */
  width?: number;
  /** @internal Do not use! */
  height?: number;
} & SharedProps;

export type Dimension<T extends IllustrationVariant> = keyof typeof illustrationSizes[T];

export type IllustrationProps<
  Name extends IllustrationNames,
  Variant extends IllustrationVariant,
> = {
  /** Name of illustration as defined in Figma */
  name: Name;
  /**
   * Size of illustration given that the size constraint is available in Figma
   * @default pictogram - 48x48, heroSquare - 240x240, spotRectangle - 240x120, spotSquare 120x120
   */
  dimension?: Dimension<Variant>;
  /** Multiply the width & height while maintaining aspect ratio */
  scaleMultiplier?: number;
} & SharedProps;

export type HeroSquareProps = IllustrationProps<IllustrationHeroSquareNames, 'heroSquare'>;

export type SpotSquareProps = IllustrationProps<IllustrationSpotSquareNames, 'spotSquare'>;

export type PictogramProps = IllustrationProps<IllustrationPictogramNames, 'pictogram'>;

export type SpotRectangleProps = IllustrationProps<IllustrationSpotRectangleNames, 'spotRectangle'>;
