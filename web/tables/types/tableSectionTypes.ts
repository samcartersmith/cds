import { PropsWithChildren } from 'react';

export type TableSectionTag = 'thead' | 'tbody' | 'tfoot' | 'div';

export type TableSectionCtx = {
  type?: TableSectionTag;
};

export type TableSectionProps = PropsWithChildren<{
  /**
   * Internal only
   * @default undefined
   */
  as?: TableSectionTag;
}>;
