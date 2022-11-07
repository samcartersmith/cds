// This is from the current CDS figma but the design is not finalized.
import { css } from 'linaria';

/** @deprecated Please use the elevation prop on Box */
export const level0 = css`
  box-shadow: none;
`;

/** @deprecated Please use the elevation prop on Box */
export const level1 = css`
  box-shadow: 0 1px 5px 0 rgba(var(--gray40), 20%), 0 3px 1px 0 rgba(var(--gray40), 12%),
    0 2px 2px 0 rgba(var(--gray40), 14%);
`;

/** @deprecated Please use the elevation prop on Box */
export const level2 = css`
  box-shadow: 0 3px 5px 0 rgba(var(--gray40), 20%), 0 1px 18px 0 rgba(var(--gray40), 12%),
    0 6px 10px 0 rgba(var(--gray40), 14%);
`;
