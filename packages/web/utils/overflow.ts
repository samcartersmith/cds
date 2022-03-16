import { css } from 'linaria';
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
  word-wrap: break-word;
`;

export const useOverflowTextStyles = (expanded: boolean) =>
  expanded ? overflowStyles : truncatedStyles;
