import { NoopFn } from './Helpers';
import { SharedProps } from './SharedProps';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';

/** Menu is exclusively for Web ONLY. Use Tray for Mobile */
export type PopoverMenuBaseProps = {
  /** Callback that is fired whenever a select option is selected */
  onChange?: (newValue: string) => void;
  /** Default selected value, or preselected value */
  value?: string;
  /**
   * Width of input as a percentage string or number converted to pixels.
   * @default 100%
   * */
  width?: `${number}%` | number;
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
} & SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  >;
