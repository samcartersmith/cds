import { css } from 'linaria';
import { palette } from '../../tokens';

export const tableRow = css`
  background-color: ${palette.background};
  padding: 0;
`;

export const tableRowHover = css`
  &:hover {
    background-color: ${palette.backgroundAlternate};
  }
`;
