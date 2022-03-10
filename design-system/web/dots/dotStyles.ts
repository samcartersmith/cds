import { PinPlacement } from '@cbhq/cds-common';
import { css } from 'linaria';

export const dotRootContainerStyles = css`
  && {
    width: fit-content;
    position: relative;
  }
`;

export const getTransform = (pin?: PinPlacement) => {
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

  return {
    position: 'absolute',
    [transformedHorizontal]: 0,
    [vertical]: 0,
    transform: `translate(${horizontalMultiplier * 50}%, ${verticalMultiplier * 50}%)`,
  } as const;
};
