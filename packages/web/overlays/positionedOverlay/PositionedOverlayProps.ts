import { ReactNode, RefObject } from 'react';
import { Placement } from '@popperjs/core';
import { SpacingScale } from '@cbhq/cds-common/types';

export type PositionedOverlayProps = {
  content: ReactNode;
  /** Subject of the positionedOverlay that when interacted with will toggle the visibility of the content */
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
  /** Ref passed to Overlay used to control animations */
  overlayRef?: RefObject<HTMLElement>;
  /** Callback that fires when the subject is pressed */
  onPressSubject?: () => void;
  /** Callback that is fired after the content animates out */
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  /** Callback fired when the subject is focused */
  onFocus?: () => void;
  /** Callback fired when the subject or content is blurred */
  onBlur?: () => void;
  /** Callback fired when a mouse down event is fired on the subject */
  onMouseDown?: (event: React.MouseEvent) => void;
  /** Invert the the color spectrum for the Popover content */
  invertPopoverSpectrum?: boolean;
  /** Controls visibility of the Popover content */
  visible: boolean;
  /**
   * Custom placement config
   * @default bottom
   */
  placement?: Placement;
  /** Offset content placement on the x axis */
  skid?: SpacingScale;
  /** Offset content placement on the y axis */
  gap?: SpacingScale;
};
