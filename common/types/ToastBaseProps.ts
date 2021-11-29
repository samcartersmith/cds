import { ReactElement } from 'react';
import { NoopFn } from './Helpers';

export type ToastText = string;
export type ToastDuration = {
  /**
   * Duration in milliseconds.
   * Duration is automatically calculated based on this formula https://docs.google.com/document/d/1s1u9CGb37HCeuMo2ZcVz7Zxo13HH6F10J7Z5W-8ks48
   * @danger This will override default calculated value.
   */
  dangerouslySetDuration?: number;
};

export type ToastBaseOptions = {
  /**
   * Optional action element. Commonly button or link.
   */
  action?: ReactElement;
  /**
   * Callback fired when the close button is pressed.
   */
  onWillHide?: NoopFn;
  /**
   * Callback fired when toast close animation is finished.
   */
  onDidHide?: NoopFn;
};

export type ToastOptions = ToastBaseOptions & ToastDuration;

export type ToastBaseProps = { text: ToastText } & ToastBaseOptions;
