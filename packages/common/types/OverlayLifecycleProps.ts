import { NoopFn } from './Helpers';

export type OverlayLifecycleProps = {
  /**
   * Callback fired before the component shows.
   */
  onWillShow?: NoopFn;
  /**
   * Callback fired after the component is visible.
   */
  onDidShow?: NoopFn;
  /**
   * Callback fired before the component hides.
   */
  onWillHide?: NoopFn;
  /**
   * Callback fired after the component is hidden.
   */
  onDidHide?: NoopFn;
};
