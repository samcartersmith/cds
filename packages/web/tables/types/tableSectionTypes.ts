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
}> &
  SharedProps;
