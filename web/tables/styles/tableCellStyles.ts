import { css } from 'linaria';
import { palette } from '../../tokens';

export const tableCell = css`
  padding: 0; /* Padding now handled by the cell */
  margin: 0;
  vertical-align: middle;
  border: none;
`;

export const tableHeaderCell = css`
  color: ${palette.foregroundMuted};
`;

export const tableFooterCell = css`
  color: ${palette.foregroundMuted};
`;
