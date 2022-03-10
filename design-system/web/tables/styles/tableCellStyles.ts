import { css } from 'linaria';
import { palette, spacing } from '../../tokens';

export const tableCell = css`
  padding: 0 ${spacing[3]};
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
