import { css } from 'linaria';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

export const getZIndexFromOrder = (order: number, total: number) =>
  total - order + zIndex.interactable;

const truncatedStyles = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const overflowStyles = css`
  overflow: visible;
  white-space: normal;
`;

export const useOverflowTextStyles = (expanded: boolean) =>
  expanded ? overflowStyles : truncatedStyles;
