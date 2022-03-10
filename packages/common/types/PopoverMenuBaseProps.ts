import { FocusEvent,ReactNode } from 'react';

import { NoopFn } from './Helpers';
import { SetState } from './React';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type PopoverPositionConfig = {
  offset: [number, number];
  placement:
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
};

/** Menu is exclusively for Web ONLY. Use Tray for Mobile */
export type PopoverMenuBaseProps = {
  children: ReactNode[];
  /** Callback that is fired whenever a select option is selected */
  onChange?: ((newValue: string) => void) | SetState<string>;
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
  /** Disable interaction with the Menu and trigger */
  disabled?: boolean;
  /** Callback that mounts the Menu */
  openMenu: NoopFn;
  /** Callback that unMounts the Menu */
  closeMenu: NoopFn;
  /**
   * Whether Menu is mounted or dismounted
   * @default false
   */
  visible: boolean;
  /** Callback that fires when PopoverMenu or trigger are blurred */
  onBlur?: NoopFn;
  /**
   * When true, the PopoverMenu trigger will fill all available horizontal space
   * @default false
   */
  flush?: boolean;
  /** Does not render the PopoverMenu inside of a portal (react-dom createPortal).
   * Portal is automatically disabled for SSR
   * */
  disablePortal?: boolean;
  /**
   * Pass a custom config for the PopoverMenu position relative to the trigger
   * @internal this property is for internal use only!
   */
  popoverPositionConfig?: PopoverPositionConfig;
  /**
   * Enable when PopoverMenu is used with a SearchInput as the trigger. Applies
   * relevant focus behaviors and keyboard events
   * @default false
   */
  searchEnabled?: boolean;
} & SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  >;

export type PopoverMenuRefProps = {
  handlePopoverMenuBlur: (event: FocusEvent<HTMLElement>) => void;
  focusSelectOption: NoopFn;
};
