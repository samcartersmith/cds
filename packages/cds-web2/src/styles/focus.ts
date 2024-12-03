import { css } from '@linaria/core';

export const focusRing = css`
  /* if we use the focus ring we need to turn off the browser stylesheet outline */
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-backgroundPrimary);
    outline-offset: 2px;
  }
`;
// InsetFocusRing removes the outline offset
export const insetFocusRing = css`
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-backgroundPrimary);
    outline-offset: 0;
  }
`;
