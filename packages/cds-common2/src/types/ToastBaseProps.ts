import { ColorSurgeBackground } from './ColorSurgeBaseProps';
import { DimensionValue } from './DimensionStyles';
import { OverlayLifecycleProps } from './OverlayLifecycleProps';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type ToastText = string;
export type ToastDuration = {
  /**
   * Duration in milliseconds.
   * Duration is automatically calculated based on this formula https://docs.google.com/document/d/1s1u9CGb37HCeuMo2ZcVz7Zxo13HH6F10J7Z5W-8ks48
   * @danger This will override default calculated value.
   */
  duration?: number;
};

export type ToastAction = {
  /**
   * Action label
   */
  label: string;
  /**
   * Callback function fired when the action is pressed
   */
  onPress: () => void;
} & SharedProps;

export type ToastBaseOptions = {
  /**
   * Optional toast action
   */
  action?: ToastAction;
  /**
   * Bottom offset position
   * @default spacing2(Mobile)/spacing4(Web)
   */
  bottomOffset?: DimensionValue;
  /**
   * Controls color surge background
   * @default primary
   */
  variant?: ColorSurgeBackground;
} & Pick<OverlayLifecycleProps, 'onWillHide' | 'onDidHide'>;

export type ToastOptions = ToastBaseOptions & ToastDuration;

export type ToastBaseProps = { text: ToastText } & ToastBaseOptions &
  SharedProps &
  SharedAccessibilityProps;

export type ToastHandleClose = () => Promise<boolean>;

export type ToastRefBaseProps = {
  hide: ToastHandleClose;
};
