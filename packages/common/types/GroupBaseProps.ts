import { SharedProps } from './SharedProps';
import { SpacingScale } from './SpacingScale';

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
  divider?: React.ComponentType | null;
  /** Gap to insert between siblings. */
  gap?: SpacingScale;
  /**
   * Stack items horizontally instead of vertically.
   * @deprecated Please use direction=vertical | horizontal moving forward. This will be sunset in Q2.
   * @default false
   * */
  horizontal?: boolean;
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
    Wrapper: React.ComponentType<BoxProps>;
    item: React.ReactChild;
    index: number;
    isFirst: boolean;
    isLast: boolean;
  }) => React.ReactChild;
} & BoxProps &
  SharedProps;

export type RenderGroupItem<BoxProps> = GroupBaseProps<BoxProps>['renderItem'];
