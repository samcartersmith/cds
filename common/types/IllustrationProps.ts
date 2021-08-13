import { illustrationSizes } from '../tokens/illustrations';
import {
  IllustrationHeroSquareNames,
  IllustrationSpotRectangleNames,
  IllustrationPictogramNames,
  IllustrationSpotSquareNames,
} from './Illustration';
import { SharedProps } from './SharedProps';

export type IllustrationBaseProps = {
  name:
    | IllustrationHeroSquareNames
    | IllustrationSpotRectangleNames
    | IllustrationPictogramNames
    | IllustrationSpotSquareNames;
  /** @internal Do not use! */
  width?: number;
  /** @internal Do not use! */
  height?: number;
} & SharedProps;

export type HeroSquareProps = {
  name: IllustrationHeroSquareNames;
  dimension?: keyof typeof illustrationSizes.heroSquare;
} & SharedProps;

export type SpotSquareProps = {
  name: IllustrationSpotSquareNames;
  dimension?: keyof typeof illustrationSizes.spotSquare;
} & SharedProps;

export type PictogramProps = {
  name: IllustrationPictogramNames;
  dimension?: keyof typeof illustrationSizes.pictogram;
} & SharedProps;

export type SpotRectangleProps = {
  name: IllustrationSpotRectangleNames;
  dimension?: keyof typeof illustrationSizes.spotRectangle;
} & SharedProps;
