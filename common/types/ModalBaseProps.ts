import { MouseEventHandler, ReactNode, ReactElement } from 'react';
import { PositionStyles, BoxBaseProps } from './BoxBaseProps';
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
  onClose: NoopFn;
  /** Component to render as the Modal footer */
  footer?: ReactElement<ModalFooterBaseProps>;
  /** Handles back action */
  onBack?: NoopFn;
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
  hideCloseIcon?: boolean;
} & SharedProps &
  Pick<PositionStyles, 'zIndex'>;

export type ModalRefBaseProps = {
  onClose: NoopFn | MouseEventHandler<Element>;
};

export type ModalHeaderBaseProps = Partial<Pick<ModalBaseProps, 'onClose' | 'onBack' | 'title'>>;

export type ModalFooterBaseProps = {
  /** Primary action button */
  PrimaryAction: NonNullable<ReactElement<ButtonBaseProps>>;
  /** Secondary action button */
  SecondaryAction?: ReactElement<ButtonBaseProps>;
} & Omit<BoxBaseProps, 'children'>;
