import { ReactElement, MouseEvent, MutableRefObject } from 'react';
import { NoopFn } from './Helpers';
import { SharedProps } from './SharedProps';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';

type OffsetConfigProps = {
  helperText: boolean;
  compact: boolean;
};

/** Menu is exclusively for Web ONLY. Use Tray for Mobile */
export type PopoverMenuBaseProps = {
  /**
   * Object passed when Select is used as a trigger. Used to calculate the Menu offset based on presence of nodes in parent InputStack
   * @danger internal use only
   * */
  offsetConfig?: OffsetConfigProps;
  /** Callback that is fired whenever a select option is selected */
  onChange?: (newValue: string) => void;
  /** Default selected value, or preselected value */
  value?: string;
  /**
   * Width of input as a percentage string or number converted to pixels.
   * @default 100%
   * */
  width?: `${number}%` | number;
  /**
   * Callback that returns a node used to trigger Menu open and close
   * Can optionally accept focus state and/or the currently selected value as props
   * Eg: if you have custom focus states for the trigger or if you want to display the selected value in the trigger (respectively)
   */
  triggerNode: () => ReactElement;
  /**
   * @danger This is for internal use only! This is used exclusively when the trigger's heighest DOM node is not an interactable
   */
  customTriggerRef?: MutableRefObject<HTMLButtonElement | null>;
  /** Disable interaction with the Menu and trigger */
  disabled?: boolean;
  /**
   * Optional callback fired whenever the trigger is pressed.
   * Since the trigger is cloned, if you pass it an onPress handler directly, it will not fire. You will need to use this prop instead.
   */
  onPress?: NoopFn;
  /** Callback that mounts the Menu */
  openMenu: NoopFn;
  /** Callback that unMounts the Menu */
  closeMenu: NoopFn;
  /**
   * Whether Menu is mounted or dismounted
   * @default false
   */
  visible: boolean;
} & SharedProps &
  SharedAccessibilityProps;

export type PopoverMenuRefProps = {
  /**
   * @danger Internal use only. this should only be used if the trigger's highest level DOM not is a non interactable
   */
  handleOnPopoverMenuTriggerPress: (event: MouseEvent<HTMLElement>) => void;
};
