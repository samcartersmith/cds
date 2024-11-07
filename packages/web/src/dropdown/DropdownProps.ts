import { SelectBaseProps, SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common/types';

import { PopoverProps } from '../overlays/popover/PopoverProps';

export type DropdownProps = {
  /** Display a Modal on mobile web instead of a relatively positioned Dropdown */
  enableMobileModal?: boolean;
  /** Prevent menu from closing when an option is selected */
  disableCloseOnOptionChange?: boolean;
  /** Default selected value, or preselected value */
  value?: string;
  /**
   * Width of input as a percentage string or number converted to pixels.
   * @default 100%
   * */
  width?: `${number}%` | number;
  /** Minimum width of input as a percentage string or number converted to pixels. */
  minWidth?: `${number}%` | number;
  /** Maximum width of input as a percentage string or number converted to pixels. */
  maxWidth?: `${number}%` | number;
  /** Can optionally pass a maxHeight.
   * @default 300
   * */
  maxHeight?: `${number}%` | number;
  /** Callback that fires when Dropdown is opened */
  onOpenMenu?: () => void;
  /** Callback that fires when Dropdown is closed */
  onCloseMenu?: () => void;
  /** Callback that fires when Dropdown or trigger are blurred */
  onBlur?: () => void;
  /** Does not render the Dropdown inside of a portal (react-dom createPortal).
   * Portal is automatically disabled for SSR
   * */
  disablePortal?: boolean;
  /**
   * Prevents the Dropdown menu from opening.
   * You'll need to surface disabled state on the trigger manually.
   */
  disabled?: boolean;
} & Pick<
  PopoverProps,
  | 'content'
  | 'children'
  | 'showOverlay'
  | 'contentPosition'
  | 'block'
  | 'disableTypeFocus'
  | 'controlledElementAccessibilityProps'
  | 'respectNegativeTabIndex'
> &
  SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Pick<SelectBaseProps, 'onChange'>;

export type DropdownRefProps = {
  openMenu: () => void;
  closeMenu: () => void;
};
