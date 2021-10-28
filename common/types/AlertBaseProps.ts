import { IllustrationPictogramNames } from './IllustrationNames';
import { NoopFn } from './Helpers';
import { PositionStyles } from './BoxBaseProps';
import { SharedProps } from './SharedProps';
import { ModalBaseProps } from './ModalBaseProps';

export type AlertBaseProps = {
  /**
   * Alert title
   */
  title: string;
  /**
   * Alert body/description
   */
  body: string;
  /**
   * Illustration pictogram name for alert
   */
  pictogramName?: IllustrationPictogramNames;
  /**
   * Title of the primary action
   */
  primaryActionTitle: string;
  /**
   * Callback function fired when the primary action is pressed.
   */
  primaryActionOnPress: NoopFn;
  /**
   * Title of the secondary action
   */
  secondaryActionTitle?: string;
  /**
   * Callback function fired when the secondary action is pressed.
   */
  secondaryActionOnPress?: NoopFn;
} & Pick<ModalBaseProps, 'onRequestClose'> &
  SharedProps &
  Pick<PositionStyles, 'zIndex'>;
