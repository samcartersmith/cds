import { css } from 'linaria';

import { borderRadius, borderWidth, palette } from '../../tokens';

const TABLE_BORDER = `${borderWidth.card} solid ${palette.line}`;

export const table = css`
  display: table;
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border: none;

  thead,
  tbody,
  tfoot {
    padding: 0;
    margin: 0;
    border: none;
  }
`;

export const tableFixed = css`
  table-layout: fixed;
`;

export const tableVariantBase = css`
  table {
    background-color: ${palette.background};
    color: ${palette.foreground};

    /* make sure table is as least as wide as its contents */
    min-width: fit-content;
  }
`;

export const tableVariantGraph = css`
  table {
    & > tfoot {
      border-top: ${TABLE_BORDER};
    }

    & > tr > td,
    & > tbody > tr > td,
    & > thead > tr > th,
    & > thead > .table-row,
    & > tfoot > tr > td {
      border-bottom: ${TABLE_BORDER};
      border-right: ${TABLE_BORDER};
    }

    & > tbody > tr:last-child > td,
    & > tfoot > tr:last-child > td {
      border-bottom: none;
    }

    & > thead > tr > th:last-child,
    & > tbody > tr > td:last-child,
    & > thead > .table-row:last-child,
    & > tfoot > tr > td:last-child {
      border-right: none;
    }
  }
`;

export const tableVariantRuled = css`
  table {
    & > tfoot {
      border-top: ${TABLE_BORDER};
    }

    & > tr > td,
    & > tbody > tr > td,
    & > thead > tr > th,
    & > tfoot > tr > td {
      border-bottom: ${TABLE_BORDER};
    }

    & > tbody > tr:last-child > td,
    & > tfoot > tr:last-child > td {
      border: none;
    }
  }
`;

export const tableBorder = css`
  overflow: auto;
  border: ${TABLE_BORDER};
  border-radius: ${borderRadius.standard};
`;
