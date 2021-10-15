import { MouseEventHandler, ReactNode, ReactElement } from 'react';
import { PositionStyles } from './BoxBaseProps';
import { SharedProps } from './SharedProps';
import { ButtonBaseProps } from './ButtonBaseProps';
import { NoopFn } from './Helpers';

export type ModalBaseProps = {
  /** Component to render as the Modal content */
  children: NonNullable<ReactNode>;
  /**
   * Controls visibility of the Modal
   * @default false
   */
  visible: boolean;
  /** Handles Modal close */
  onRequestClose: NoopFn;
  /** Component to render as the Modal footer */
  footer?: ReactElement<ModalFooterBaseProps>;
  /** Handles back action */
  onBackButtonPress?: NoopFn;
  /** Title of the Modal */
  title?: string;
  /**
   * Hide top and bottom dividers inside Modal body
   * @default false
   */
  hideDividers?: boolean;
  /**
   * Hide the close icon on the top right
   * @default false
   */
  hideCloseButton?: boolean;
} & SharedProps &
  Pick<PositionStyles, 'zIndex'>;

export type ModalRefBaseProps = {
  onRequestClose: NoopFn | MouseEventHandler<Element>;
};

export type ModalHeaderBaseProps = Partial<
  Pick<ModalBaseProps, 'onRequestClose' | 'onBackButtonPress' | 'title'>
>;

export type ModalFooterBaseProps = {
  /** Primary action button */
  PrimaryAction: NonNullable<ReactElement<ButtonBaseProps>>;
  /** Secondary action button */
  SecondaryAction?: ReactElement<ButtonBaseProps>;
} & SharedProps;
