import { BorderedStyles } from '@cbhq/cds-common';
import { css, cx } from 'linaria';

import { palette } from '../tokens';

export const bordered = css`
  border: 1px solid ${palette.line};
`;

export const borderedStart = css`
  border-left: 1px solid ${palette.line};
`;

export const borderedEnd = css`
  border-right: 1px solid ${palette.line};
`;

export const borderedTop = css`
  border-top: 1px solid ${palette.line};
`;

export const borderedBottom = css`
  border-bottom: 1px solid ${palette.line};
`;

export const borderedHorizontal = [borderedStart, borderedEnd].join(' ');
export const borderedVertical = [borderedTop, borderedBottom].join(' ');

export const getBorderStyles = (props: BorderedStyles) => {
  return cx(
    props.bordered && bordered,
    props.borderedTop && borderedTop,
    props.borderedBottom && borderedBottom,
    props.borderedStart && borderedStart,
    props.borderedEnd && borderedEnd,
    props.borderedHorizontal && borderedHorizontal,
    props.borderedVertical && borderedVertical
  );
};
