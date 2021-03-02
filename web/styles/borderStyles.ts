import { css } from 'linaria';

import { palette } from './palette';

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
