import { css } from 'linaria';
import { palette, spacing } from '../../tokens';

export const tableCell = css`
  padding: ${spacing['1']} ${spacing['2']};
  vertical-align: middle;
  border: none;
`;

export const tableHeaderCell = css`
  color: ${palette.foregroundMuted};
`;

export const tableFooterCell = css`
  color: ${palette.foregroundMuted};
`;
