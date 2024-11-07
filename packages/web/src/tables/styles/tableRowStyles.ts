import { css } from 'linaria';
import { toCssVar } from '@cbhq/cds-utils/string';

import { palette } from '../../tokens';

const gray5CssVar = toCssVar('gray5');
const hoverColor = `rgba(var(${gray5CssVar}), 0.35)`;

export const tableRow = css`
  /* Let us be specific */
  &:nth-child(1n) {
    background-color: ${palette.background};
    padding: 0;
    border: 0;
  }

  // Ensure sticky headers display properly
  > th {
    background-color: inherit;
  }
`;

export const tableRowHover = css`
  /* Lest we be overridden */
  &:nth-child(1n) {
    &:focus,
    &:hover {
      background-color: ${hoverColor};
    }
  }
`;
