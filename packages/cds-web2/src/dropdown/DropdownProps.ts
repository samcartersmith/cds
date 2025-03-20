import type { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common2/types';

import { type PopoverProps } from '../overlays/popover/PopoverProps';

export type DropdownRef = {
  openMenu: () => void;
  closeMenu: () => void;
};

export type DropdownInternalProps = DropdownProps & {
  visible: boolean;
};

export type DropdownProps = {
  /**
   * Enable to have Dropdown render its content inside a Modal as opposed to a relatively positioned Popover
   * Ideal for mobile or smaller devices.
   * */
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
  /** Callback that is fired whenever an option is selected */
  onChange?: ((newValue: string) => void) | React.Dispatch<React.SetStateAction<string>>;
  /**
   * Prevents the Dropdown menu from opening.
   * You'll need to surface disabled state on the trigger manually.
   */
  disabled?: boolean;
} & Pick<
  PopoverProps,
  // TODO it doesn't really make sense to place these Popover props on the DropdownProps as it is possible for the Dropdown to render a Modal instead of Popover
  // it would be better to abstract the behavior of dropdown completely away from the implementation details
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
  >;

export type DropdownRefProps = {
  openMenu: () => void;
  closeMenu: () => void;
};
