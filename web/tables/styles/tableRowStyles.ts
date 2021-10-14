import { css } from 'linaria';
import { palette } from '../../tokens';

export const tableRow = css`
  /* Let us be specific */
  &:nth-child(1n) {
    background-color: ${palette.background};
    padding: 0;
    border: 0;
  }
`;

export const tableRowHover = css`
  /* Lest we be overridden */
  &:nth-child(1n) {
    &:hover {
      background-color: ${palette.backgroundAlternate};
    }
  }
`;
