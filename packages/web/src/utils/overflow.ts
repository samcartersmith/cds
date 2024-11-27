import { css } from '@linaria/core';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

export const getZIndexFromRow = (row: number, totalRows: number) =>
  totalRows - row + zIndex.interactable;

const truncatedStyles = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const overflowStyles = css`
  overflow: visible;
  white-space: normal;
  hyphens: auto;
`;

export const getOverflowTextStyles = (expanded: boolean) =>
  expanded ? overflowStyles : truncatedStyles;
