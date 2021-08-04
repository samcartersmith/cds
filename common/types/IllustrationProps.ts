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
} & SharedProps;

export type SpotSquareProps = {
  name: IllustrationSpotSquareNames;
} & SharedProps;

export type PictogramProps = {
  name: IllustrationPictogramNames;
} & SharedProps;

export type SpotRectangleProps = {
  name: IllustrationSpotRectangleNames;
} & SharedProps;
