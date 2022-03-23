import { IllustrationPictogramNames } from './IllustrationNames';

export type TileBaseProps = {
  title: string;
  pictogram: IllustrationPictogramNames;
  /** Surfaces a DotCount around the Pictogram */
  count?: number;
  /** Reveals truncated title text */
  showOverflow?: boolean;
};
