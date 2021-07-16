import {
  IllustrationHeroSquareNames,
  IllustrationSpotRectangleNames,
  IllustrationPictogramNames,
  IllustrationSpotSquareNames,
} from './Illustration';
import { SharedProps } from './SharedProps';

export interface IllustrationBaseProps extends SharedProps {
  name:
    | IllustrationHeroSquareNames
    | IllustrationSpotRectangleNames
    | IllustrationPictogramNames
    | IllustrationSpotSquareNames;
  /** @internal Do not use! */
  width?: number;
  /** @internal Do not use! */
  height?: number;
}

export interface HeroSquareProps extends SharedProps {
  name: IllustrationHeroSquareNames;
}

export interface SpotSquareProps extends SharedProps {
  name: IllustrationSpotSquareNames;
}

export interface PictogramProps extends SharedProps {
  name: IllustrationPictogramNames;
}

export interface SpotRectangleProps extends SharedProps {
  name: IllustrationSpotRectangleNames;
}
