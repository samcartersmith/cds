import {
  NoopFn,
  SelectBaseProps,
  SharedAccessibilityProps,
  SharedProps,
} from '@cbhq/cds-common/types';

import { PositionedOverlayProps } from '../overlays/positionedOverlay/PositionedOverlayProps';

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
  onOpenMenu?: NoopFn;
  /** Callback that fires when Dropdown is closed */
  onCloseMenu?: NoopFn;
  /** Callback that fires when PopoverMenu or trigger are blurred */
  onBlur?: NoopFn;
  /** Does not render the PopoverMenu inside of a portal (react-dom createPortal).
   * Portal is automatically disabled for SSR
   * */
  disablePortal?: boolean;
  /**
   * Enable when PopoverMenu is used with a SearchInput as the trigger. Applies
   * relevant focus behaviors and keyboard events
   * @default false
   */
  enableSearch?: boolean;
} & Pick<
  PositionedOverlayProps,
  'content' | 'children' | 'showOverlay' | 'contentPosition' | 'block'
> &
  SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Pick<SelectBaseProps, 'onChange'>;

export type DropdownRefProps = {
  openMenu: NoopFn;
  closeMenu: NoopFn;
};
