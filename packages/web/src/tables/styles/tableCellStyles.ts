import { css } from '@linaria/core';

import { palette } from '../../tokens';

export const tableCell = css`
  padding: 0;
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

// Required to handle truncation - this looks whack, but
// the table behavior will override this. We use `width`
// to explicitly define a table columns width
export const tableOverflowWidth = css`
  max-width: 0;
`;
