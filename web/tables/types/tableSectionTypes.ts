import { PropsWithChildren } from 'react';

export type TableSectionTag = 'thead' | 'tbody' | 'tfoot' | 'div';

export type TableSectionCtx = {
  type?: TableSectionTag;
};

export type TableSectionProps = PropsWithChildren<{
  /**
   * Linaria flavored className.
   * @default undefined
   */
  className?: string;
}>;

export type TableSectionInternalProps = TableSectionProps & {
  /**
   * Internal only
   * @default undefined
   */
  as?: TableSectionTag;
};
