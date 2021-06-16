import { BorderedStyles, ElevationLevels } from '@cbhq/cds-common';
import { css, cx } from 'linaria';

import { palette } from '../tokens';

export const bordered = css`
  border: 1px solid ${palette.line};
`;

export const borderedOff = css`
  border-width: 0;
`;

export const borderedStart = css`
  border-left: 1px solid ${palette.line};
`;

export const borderedStartOff = css`
  border-left-width: 0;
`;

export const borderedEnd = css`
  border-right: 1px solid ${palette.line};
`;

export const borderedEndOff = css`
  border-right-width: 0;
`;

export const borderedTop = css`
  border-top: 1px solid ${palette.line};
`;

export const borderedTopOff = css`
  border-top-width: 0;
`;

export const borderedBottom = css`
  border-bottom: 1px solid ${palette.line};
`;

export const borderedBottomOff = css`
  border-bottom-width: 0;
`;

export const borderedHorizontal = [borderedStart, borderedEnd].join(' ');
export const borderedVertical = [borderedTop, borderedBottom].join(' ');

export const borderedHorizontalOff = [borderedStartOff, borderedEndOff].join(' ');
export const borderedVerticalOff = [borderedTopOff, borderedBottomOff].join(' ');

export const getBorderStyles = (props: BorderedStyles & { elevation?: ElevationLevels }) => {
  const args: string[] = [];

  // When elevating, always apply a border
  if (props.elevation) {
    return bordered;
  }

  if (props.bordered !== undefined) {
    args.push(props.bordered ? bordered : borderedOff);
  }

  if (props.borderedTop !== undefined) {
    args.push(props.borderedTop ? borderedTop : borderedTopOff);
  }

  if (props.borderedBottom !== undefined) {
    args.push(props.borderedBottom ? borderedBottom : borderedBottomOff);
  }

  if (props.borderedStart !== undefined) {
    args.push(props.borderedStart ? borderedStart : borderedStartOff);
  }

  if (props.borderedEnd !== undefined) {
    args.push(props.borderedEnd ? borderedEnd : borderedEndOff);
  }

  if (props.borderedHorizontal !== undefined) {
    args.push(props.borderedHorizontal ? borderedHorizontal : borderedHorizontalOff);
  }

  if (props.borderedVertical !== undefined) {
    args.push(props.borderedVertical ? borderedVertical : borderedVerticalOff);
  }

  return cx(...args);
};
