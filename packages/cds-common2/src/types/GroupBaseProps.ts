import { ThemeVars } from '../core/theme';

import { SharedProps } from './SharedProps';

export type GroupDirection = 'horizontal' | 'vertical';

export type GroupBaseProps<BoxProps> = {
  /** Accessibility label describing the group of items. */
  accessibilityLabel?: string;
  /** Items to render in a group. */
  children?: React.ReactNode;
  /** Direction a group of components should flow.
   * @default vertical
   */
  direction?: GroupDirection;
  /** Divider Component to include between each item in a group. */
  divider?: React.ComponentType<React.PropsWithChildren<unknown>> | null;
  /** Gap to insert between siblings. */
  gap?: ThemeVars.Space;
  /** Control the layout of each item in a group.
   * @default Box component for given platform
   * @example
   * ```
   * renderItem={({item, Wrapper, index}) => {
   *  return <Wrapper borderedTop={index === 0}>{item}</Wrapper>
   * }}
   * ```
   */
  renderItem?: (info: {
    Wrapper: React.ComponentType<React.PropsWithChildren<BoxProps>>;
    item: React.ReactChild;
    index: number;
    isFirst: boolean;
    isLast: boolean;
  }) => React.ReactChild;
} & BoxProps &
  SharedProps;

export type RenderGroupItem<BoxProps> = GroupBaseProps<BoxProps>['renderItem'];
