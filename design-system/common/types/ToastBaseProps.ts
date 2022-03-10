import { OverlayLifecycleProps } from './OverlayLifecycleProps';
import { NoopFn } from './Helpers';
import { SharedProps } from './SharedProps';
import { DimensionValue } from './DimensionStyles';

export type ToastText = string;
export type ToastDuration = {
  /**
   * Duration in milliseconds.
   * Duration is automatically calculated based on this formula https://docs.google.com/document/d/1s1u9CGb37HCeuMo2ZcVz7Zxo13HH6F10J7Z5W-8ks48
   * @danger This will override default calculated value.
   */
  dangerouslySetDuration?: number;
};

export type ToastAction = {
  /**
   * Action label
   */
  label: string;
  /**
   * Callback function fired when the action is pressed
   */
  onPress: NoopFn;
} & SharedProps;

export type ToastBaseOptions = {
  /**
   * Optional toast action
   */
  action?: ToastAction;
  /**
   * Bottom offset postion
   */
  bottomOffset?: DimensionValue;
} & Pick<OverlayLifecycleProps, 'onWillHide' | 'onDidHide'>;

export type ToastOptions = ToastBaseOptions & ToastDuration;

export type ToastBaseProps = { text: ToastText } & ToastBaseOptions & SharedProps;

export type ToastHandleClose = () => Promise<boolean>;

export type ToastRefBaseProps = {
  hide: ToastHandleClose;
};
