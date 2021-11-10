import { ReactNode } from 'react';
import { DrawerRenderChildren, DrawerBaseProps } from './DrawerBaseProps';

export type TrayBaseProps = {
  children: NonNullable<ReactNode> | DrawerRenderChildren;
  /**
   * Optional callback that, if provided, will be triggered when the Tray is toggled open/ closed
   * If used for analytics, context ('visible' | 'hidden') can be bundled with the event info to track whether the
   * multiselect was toggled into or out of view
   */
  onVisibilityChange?: (context: 'visible' | 'hidden') => void;
  /** Optional Tray title, text only */
  title?: string;
} & Omit<DrawerBaseProps, 'pin' | 'ref' | 'children'>;
