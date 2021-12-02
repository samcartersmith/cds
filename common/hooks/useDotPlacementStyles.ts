import { useMemo } from 'react';
import { BadgePlacement } from '../types/Placement';

export const OFFSET = -12;

export const useDotPlacementStyles = (placement?: BadgePlacement) => {
  return useMemo(() => {
    if (placement === undefined) {
      return { position: 'relative' };
    }

    // splits string based on dash. (i.e top-right -> [top, right])
    const directions = (placement as string).split('-');

    // If placement is incorrectly formatted, then return empty array
    if (directions.length !== 2) return {};

    const verticalDirection = directions[0]; // top or bottom

    const horizontalDirection = directions[1]; // start or end

    return {
      position: 'absolute',
      [verticalDirection]: OFFSET,
      [horizontalDirection]: OFFSET,
    };
  }, [placement]);
};
