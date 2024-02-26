import { PropsWithChildren } from 'react';
import { SharedProps } from '@cbhq/cds-common';

export type TableSectionTag = 'thead' | 'tbody' | 'tfoot' | 'div';

export type TableSectionCtx = {
  as?: TableSectionTag;
};

export type TableSectionProps = PropsWithChildren<{
  /**
   * Internal only
   * @default undefined
   */
  as?: TableSectionTag;
  /**
   * @danger This is an escape hatch. It is not intended to be used normally.
   */
  className?: string;
}> &
  SharedProps;
