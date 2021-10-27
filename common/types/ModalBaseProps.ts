import { MouseEventHandler, ReactNode, ReactElement } from 'react';
import { PositionStyles } from './BoxBaseProps';
import { SharedProps } from './SharedProps';
import { ButtonBaseProps } from './ButtonBaseProps';
import { NoopFn } from './Helpers';

export type ModalRenderChildren = (props: { closeModal: NoopFn }) => JSX.Element;

export type ModalBaseProps = {
  /** Component to render as the Modal content */
  children: ModalRenderChildren | NonNullable<ReactNode>;
  /**
   * Controls visibility of the Modal
   * @default false
   */
  visible: boolean;
  /** Handles Modal close. Optional for portal modal. */
  onRequestClose?: NoopFn;
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

export type ModalHeaderBaseProps = {
  /** Handles back action */
  onBackButtonPress?: NoopFn;
  /** Title of the Modal */
  title?: string;
} & SharedProps;

export type ModalFooterBaseProps = {
  /** Primary action button */
  primaryAction: NonNullable<ReactElement<ButtonBaseProps>>;
  /** Secondary action button */
  secondaryAction?: ReactElement<ButtonBaseProps>;
} & SharedProps;
