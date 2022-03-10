import { Placement } from '@popperjs/core';
import { ReactNode } from 'react';

export type PopoverBasePlacement = Extract<Placement, 'top' | 'bottom' | 'left' | 'right'>;

export type PopoverBaseProps = {
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
  placement?: PopoverBasePlacement;
};
