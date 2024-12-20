import { PositionStyles } from './BoxBaseProps';
import { ButtonVariant } from './ButtonBaseProps';
import { IllustrationPictogramNames } from './IllustrationNames';
import { ModalBaseProps, ModalRefBaseProps } from './ModalBaseProps';
import { SharedProps } from './SharedProps';

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
  pictogram?: IllustrationPictogramNames;
  /**
   * Should only be used internally to support overlay component over alert on mobile
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  children?: React.ReactNode;
} & AlertActionsBaseProps &
  Pick<ModalBaseProps, 'onRequestClose' | 'visible' | 'onDidClose'> &
  SharedProps &
  Pick<PositionStyles, 'zIndex'>;

export type AlertActionsBaseProps = {
  /**
   * Label of the preferred action
   */
  preferredActionLabel: string;
  /**
   * Callback function fired when the preferred action is pressed
   */
  onPreferredActionPress?: () => void;
  /**
   * Button variant of the preferred action
   * @default primary
   */
  preferredActionVariant?: Extract<ButtonVariant, 'primary' | 'negative'>;
  /**
   * Label of the dismiss action
   */
  dismissActionLabel?: string;
  /**
   * Callback function fired when the dismiss action is pressed
   */
  onDismissActionPress?: () => void;
  /**
   * Layout of the actions
   * @default horizontal
   */
  actionLayout?: 'horizontal' | 'vertical';
};

export type AlertRefBaseProps = ModalRefBaseProps;
