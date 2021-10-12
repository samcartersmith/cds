import { css } from 'linaria';
import { borderRadius, borderWidth } from '@cbhq/cds-common/tokens/border';
import { palette } from '../../tokens';

export const table = css`
  display: table;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  border: none;

  thead,
  tbody,
  tfoot {
    padding: 0;
    border: none;
  }
`;

export const tableVariantBase = css`
  background-color: ${palette.background};
  color: ${palette.foreground};

  /* make sure table is as least as wide as its contents */
  min-width: fit-content;
`;

export const tableVariantGraph = css`
  tfoot {
    border-top: ${borderWidth.card}px solid ${palette.line};
  }

  & > tr > td,
  tbody > tr > td,
  thead > tr > th,
  tfoot > tr > td {
    border-bottom: ${borderWidth.card}px solid ${palette.line};
    border-right: ${borderWidth.card}px solid ${palette.line};
  }

  tbody > tr:last-child > td,
  tfoot > tr:last-child > td {
    border-bottom: none;
  }

  thead > tr > th:last-child,
  tbody > tr > td:last-child,
  tfoot > tr > td:last-child {
    border-right: none;
  }
`;

export const tableVariantRuled = css`
  tfoot {
    border-top: ${borderWidth.card}px solid ${palette.line};
  }

  & > tr > td,
  tbody > tr > td,
  thead > tr > th,
  tfoot > tr > td {
    border-bottom: ${borderWidth.card}px solid ${palette.line};
  }

  tbody > tr:last-child > td,
  tfoot > tr:last-child > td {
    border: none;
  }
`;

export const tableBorder = css`
  overflow: hidden;
  border: ${borderWidth.card}px solid ${palette.line};
  border-radius: ${borderRadius.standard}px;
`;
