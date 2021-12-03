import { useMemo } from 'react';
import { BadgePlacement } from '../types/Placement';

export const OFFSET = -12;
export type Platforms = 'web' | 'mobile';

export const useDotPlacementStyles = (platform: Platforms, placement?: BadgePlacement) => {
  return useMemo(() => {
    if (placement === undefined) {
      return {};
    }

    // splits string based on dash. (i.e top-right -> [top, right])
    const directions = (placement as string).split('-');

    // If placement is incorrectly formatted, then return empty array
    if (directions.length !== 2) return {};

    const verticalDirection = directions[0]; // top or bottom

    let horizontalDirection = directions[1]; // start or end

    // Web doesn't understand start/end, so we have to convert it
    // to left/right
    if (platform === 'web') {
      horizontalDirection = directions[1] === 'start' ? 'left' : 'right';
    }

    return {
      position: 'absolute',
      [verticalDirection]: OFFSET,
      [horizontalDirection]: OFFSET,
    };
  }, [placement, platform]);
};
