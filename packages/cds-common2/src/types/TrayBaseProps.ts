import { DrawerBaseProps } from './DrawerBaseProps';

export type TrayRenderChildren = React.FC<{ handleClose: () => void }>;

export type TrayBaseProps = {
  children: React.ReactNode | TrayRenderChildren;
  /**
   * Optional callback that, if provided, will be triggered when the Tray is toggled open/ closed
   * If used for analytics, context ('visible' | 'hidden') can be bundled with the event info to track whether the
   * multiselect was toggled into or out of view
   */
  onVisibilityChange?: (context: 'visible' | 'hidden') => void;
  /** Text or ReactNode for optional Tray title */
  title?: React.ReactNode;
} & Omit<DrawerBaseProps, 'pin' | 'ref' | 'children'>;
