import { css } from 'linaria';
import { DotOverlap, PinPlacement } from '@cbhq/cds-common';

export const dotRootContainerStyles = css`
  && {
    width: fit-content;
    position: relative;
  }
`;

export const getTransform = (pin?: PinPlacement, overlap?: DotOverlap) => {
  if (pin === undefined) {
    return {};
  }

  // splits string based on dash. (i.e top-right -> [top, right])
  const directions = (pin as string).split('-');

  // If placement is incorrectly formatted, then return empty array
  if (directions.length !== 2) return {};

  const [vertical, horizontal] = directions;

  const transformedHorizontal = horizontal === 'start' ? 'left' : 'right';
  const verticalMultiplier = vertical === 'bottom' ? 1 : -1;
  const horizontalMultiplier = horizontal === 'end' ? 1 : -1;

  // If the content we are overlapping has a circular shape
  // we need to apply more transformation to the dot
  // so it sits on the circle rather than awkwardly outside
  // inpsiration: https://mui.com/material-ui/react-badge/#badge-overlap
  // 14% because that is what yields the best result :p
  const amountToShift = overlap === 'circular' ? '14%' : 0;

  return {
    position: 'absolute',
    [transformedHorizontal]: amountToShift,
    [vertical]: amountToShift,
    transform: `translate(${horizontalMultiplier * 50}%, ${verticalMultiplier * 50}%)`,
  } as const;
};
