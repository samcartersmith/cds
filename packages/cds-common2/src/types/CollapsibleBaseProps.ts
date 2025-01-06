import { SharedProps } from './SharedProps';
import { PaddingProps } from './SpacingProps';

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
  children: NonNullable<React.ReactNode>;
  /**
   * Direction the content should expand/collapse to
   * @default vertical
   */
  direction?: CollapsibleDirection;
} & SharedProps &
  PaddingProps;
