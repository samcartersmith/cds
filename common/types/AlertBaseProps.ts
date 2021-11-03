import { MouseEventHandler } from 'react';
import { ButtonVariant } from './ButtonBaseProps';
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
  pictogram?: IllustrationPictogramNames;
  /**
   * Label of the preferred action
   */
  preferredActionLabel: string;
  /**
   * Callback function fired when the preferred action is pressed
   */
  onPreferredActionPress: NoopFn;
  /**
   * Button variant of the preferred action
   * @default primary
   */
  preferredActionVariant?: Extract<ButtonVariant, 'primary' | 'negative'>;
  /**
   * Label of the dimiss action
   */
  dismissActionLabel?: string;
} & Pick<ModalBaseProps, 'onRequestClose' | 'visible'> &
  SharedProps &
  Pick<PositionStyles, 'zIndex'>;

export type AlertRefBaseProps = {
  onRequestClose: NoopFn & MouseEventHandler<Element>;
};
