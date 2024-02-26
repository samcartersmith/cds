import { ReactNode } from 'react';

import { PositionStyles } from './BoxBaseProps';
import { NoopFn } from './Helpers';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type ModalRenderChildren = (props: { closeModal: NoopFn }) => JSX.Element;

export type ModalBaseProps = {
  /** Component to render as the Modal content */
  children: ModalRenderChildren | NonNullable<ReactNode>;
  /**
   * Controls visibility of the Modal
   * @default false
   */
  visible: boolean;
  /**
   * Callback function fired when modal is closed.
   */
  onRequestClose: NoopFn;
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
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  width?: number;
  /**
   * Callback fired after the component is closed.
   */
  onDidClose?: NoopFn;
} & SharedProps &
  Pick<PositionStyles, 'zIndex'>;

export type ModalRefBaseProps = Pick<ModalBaseProps, 'onRequestClose'>;

export type ModalHeaderBaseProps = {
  /** Title of the Modal */
  title?: string;
  /**
   * Sets an accessible label for the back button.
   * On web, maps to `aria-label` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  backAccessibilityLabel?: SharedAccessibilityProps['accessibilityLabel'];
  /**
   * Sets an accessible hint or description for the back button.
   * On web, maps to `aria-describedby` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  backAccessibilityHint?: SharedAccessibilityProps['accessibilityHint'];
  /**
   * Sets an accessible label for the close button.
   * On web, maps to `aria-label` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  closeAccessibilityLabel?: SharedAccessibilityProps['accessibilityLabel'];
  /**
   * Sets an accessible hint or description for the close button.
   * On web, maps to `aria-describedby` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  closeAccessibilityHint?: SharedAccessibilityProps['accessibilityHint'];
} & SharedProps;
