import { ReactNode } from 'react';

import { SharedProps } from './SharedProps';

export type CollapseBaseProps = {
  /**
   * Expand/collapse state of the content.
   * @default false
   */
  expanded: boolean;
  /**
   * Collapsible content
   */
  children: NonNullable<ReactNode>;
  /**
   * Max height of the content. Overflow content will be scrollable.
   */
  maxHeight?: number;
} & SharedProps;
