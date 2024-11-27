import { css } from '@linaria/core';

import { CSSMap, Overflow } from '../types';

export const overflow: CSSMap<Overflow['overflow']> = {
  hidden: css`
    overflow: hidden;
  `,
  scroll: css`
    overflow: scroll;
  `,
  visible: css`
    overflow: visible;
  `,
  auto: css`
    overflow: auto;
  `,
  clip: css`
    /* Fallback for safari */
    overflow: hidden;
    overflow: clip;
  `,
};
