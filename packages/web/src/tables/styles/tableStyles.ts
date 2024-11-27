import { css } from '@linaria/core';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { borderRadius, borderWidth, palette } from '../../tokens';

const TABLE_BORDER = `${borderWidth.card} solid ${palette.line}`;
export const tableHeaderStaticClassName = 'cds-table-header';

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
  overflow: auto;
  width: 100%;
  table {
    background-color: ${palette.background};
    color: ${palette.foreground};

    /* make sure table is as least as wide as its contents */
    min-width: fit-content;
  }
`;

export const tableVariantGraph = css`
  table {
    & > caption {
      border-bottom: ${TABLE_BORDER};
    }

    & > tfoot {
      border-top: ${TABLE_BORDER};
    }

    & > tr > td,
    & > tbody > tr > td,
    & > tbody > tr > th,
    & > thead > .table-row,
    & > tfoot > tr > td {
      border-bottom: ${TABLE_BORDER};
      border-right: ${TABLE_BORDER};
    }

    & > tbody > tr > th,
    & > thead > tr > th {
      box-shadow: inset 0px -1px 0px 0px ${palette.line};
      border-right: ${TABLE_BORDER};
    }

    & > tbody > tr:last-child > th,
    & > tbody > tr:last-child > td,
    & > tfoot > tr:last-child > td {
      border-bottom: none;
    }

    & > thead > tr > th:last-child,
    & > tbody > tr > th:last-child,
    & > tbody > tr > td:last-child,
    & > thead > .table-row:last-child,
    & > tfoot > tr > td:last-child {
      border-right: none;
    }
  }
`;

export const tableVariantRuled = css`
  table {
    & > caption {
      border-bottom: ${TABLE_BORDER};
    }

    & > tfoot {
      border-top: ${TABLE_BORDER};
    }

    & > tr > td,
    & > tbody > tr > th,
    & > tbody > tr > td,
    & > tfoot > tr > td {
      border-bottom: ${TABLE_BORDER};
    }

    & > thead > tr > th {
      box-shadow: inset 0px -1px 0px 0px ${palette.line};
    }

    & > tbody > tr:last-child > th,
    & > tbody > tr:last-child > td,
    & > tfoot > tr:last-child > td {
      border: none;
    }
  }
`;

export const tableBorder = css`
  border: ${TABLE_BORDER};
  border-radius: ${borderRadius.rounded};
`;

export const tableStickyClassName = css`
  &.${tableHeaderStaticClassName} {
    position: sticky;
    top: 0;
    z-index: ${zIndex.interactable};
  }
`;
