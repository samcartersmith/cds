import { ReactNode } from 'react';

import { PinningDirection } from './BoxBaseProps';
import { NoopFn } from './Helpers';
import { SharedProps } from './SharedProps';

export type DrawerRenderChildren = (props: { handleClose: NoopFn }) => NonNullable<ReactNode>;

export type DrawerBaseProps = {
  /** Component to render as the Modal content */
  children: DrawerRenderChildren | NonNullable<ReactNode>;
  /**
   * Pin the modal to one side of the screen
   * @default bottom
   * */
  pin: PinningDirection;
  /**
   * Prevents a user from dismissing the drawer by pressing the overlay or swiping
   * @default false
   */
  preventDismissGestures?: boolean;
  /**
   * The HandleBar by default only is used for a bottom pinned drawer. This removes it.
   * @default false
   * */
  hideHandleBar?: boolean;
  /** Action that will happen when drawer is dismissed */
  onCloseComplete: NoopFn;
  /**
   * Prevents the Drawer from capturing pan gestures on children. Set to true when using a ScrollView as a child
   * @default false
   */
  disableCapturePanGestureToDismiss?: boolean;
  /** Callback fired when the overlay is pressed, or swipe to close */
  onBlur?: NoopFn;
} & SharedProps;

export type DrawerRefBaseProps = {
  /** ref callback that animates out the drawer */
  handleClose: NoopFn;
};
