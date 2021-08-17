import { illustrationSizes } from '../tokens/illustrations';
import {
  IllustrationHeroSquareNames,
  IllustrationSpotRectangleNames,
  IllustrationPictogramNames,
  IllustrationSpotSquareNames,
  IllustrationVariant,
} from './Illustration';
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
  /** Size of illustration given that the size constraint is available in Figma */
  dimension?: Dimension<Variant>;
} & SharedProps;

export type HeroSquareProps = IllustrationProps<IllustrationHeroSquareNames, 'heroSquare'>;

export type SpotSquareProps = IllustrationProps<IllustrationSpotSquareNames, 'spotSquare'>;

export type PictogramProps = IllustrationProps<IllustrationPictogramNames, 'pictogram'>;

export type SpotRectangleProps = IllustrationProps<IllustrationSpotRectangleNames, 'spotRectangle'>;
