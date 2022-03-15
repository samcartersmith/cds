import { ReactNode } from 'react';
import { Placement } from '@popperjs/core';

export type PositionedOverlayPlacement = Extract<Placement, 'top' | 'bottom' | 'left' | 'right'>;

export type PositionedOverlayProps = {
  content: ReactNode;
  children: ReactNode;
  disablePortal?: boolean;
  showOverlay?: boolean;
  onClickSubject?: () => void;
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onMouseDown?: (event: React.MouseEvent) => void;
  invertPopoverSpectrum?: boolean;
  visible: boolean;
  placement?: PositionedOverlayPlacement;
};
