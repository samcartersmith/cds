import React, { ReactNode } from 'react';
import { Placement } from '@popperjs/core';
import { SharedAccessibilityProps, SharedProps, SpacingScale } from '@cbhq/cds-common/types';

export type PopoverContentPositionConfig = {
  /**
   * Custom placement config
   * @default bottom
   */
  placement?: Placement;
  /** Offset content placement on the x axis */
  skid?: SpacingScale;
  /** Offset content placement on the y axis */
  gap?: SpacingScale;
  /** This should only be used if there is content within the subject that needs to be overlaid
   * eg: helperText below a Select input
   * This value will be subtracted from the gap
   */
  offsetGap?: number;
};

export type PopoverProps = {
  content: ReactNode;
  /** Subject of the Popover that when interacted with will toggle the visibility of the content */
  children: ReactNode;
  /**
   * @danger This disables React portal integration. Use this with caution.
   */
  disablePortal?: boolean;
  /**
   * Display an overlay over all content below the Popover menu
   * @default false
   */
  showOverlay?: boolean;
  /** Callback that fires when the subject is pressed */
  onPressSubject?: () => void;
  /** Callback that is fired after the content animates out */
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  /** Callback fired when the subject is focused */
  onFocus?: () => void;
  /** Callback fired when the subject or content is blurred */
  onBlur?: (event?: React.FocusEvent) => void;
  /** Callback fired when a mouse down event is fired on the subject */
  onMouseDown?: (event: React.MouseEvent) => void;
  /** Invert the the color spectrum for the Popover content */
  invertPopoverSpectrum?: boolean;
  /** Controls visibility of the Popover content */
  visible: boolean;
  /** Override content positioning defaults */
  contentPosition?: PopoverContentPositionConfig;
  /**
   * Makes the Popover Subject fill the width of the parent container
   * @default false
   */
  block?: boolean;
  /**
   * Use for editable Search Input components to ensure focus is correctly applied
   */
  disableTypeFocus?: boolean;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  SharedProps;
