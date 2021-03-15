import { css } from 'linaria';

import { CSSMap } from '../types';

export const overflow: CSSMap<string> = {
  hidden: css`
    overflow: hidden;
  `,
  scroll: css`
    overflow: scroll;
  `,
  visible: css`
    overflow: visible;
  `,
};
