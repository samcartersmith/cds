import { PositionStyles } from '@cbhq/cds-common';
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

export const position: CSSMap<PositionStyles['position'] | 'sticky'> = {
  absolute: css`
    position: absolute;
  `,
  relative: css`
    position: relative;
  `,
  sticky: css`
    position: sticky;
  `,
};
