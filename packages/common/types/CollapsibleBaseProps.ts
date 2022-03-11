import { ReactNode } from 'react';

import { SharedProps } from './SharedProps';
import { SpacingProps } from './SpacingProps';

export type CollapsibleDirection = 'vertical' | 'horizontal';

export type CollapsibleBaseProps = {
  /**
   * Expand/collapse state of the content.
   * @default true
   */
  collapsed: boolean;
  /**
   * Collapsible content
   */
  children: NonNullable<ReactNode>;
  /**
   * Max height of the content. Overflow content will be scrollable.
   */
  maxHeight?: number;
  /**
   * Max width of the content. Overflow content will be scrollable.
   */
  maxWidth?: number;
  /**
   * Direction the content should expand/collapse to
   * @default vertical
   */
  direction?: CollapsibleDirection;
} & SharedProps &
  SpacingProps;
