import { NoopFn } from './Helpers';
import { InputStackBaseProps, SharedInputProps } from './InputBaseProps';
import { SharedProps } from './SharedProps';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';

export type SelectInputBaseProps = {
  /** Pass a value that will prepopulate the select input. This will replace the placeholder text. It will also replace the label text unless you pass shouldAlwaysShowLabel */
  value?: string;
  /** If the SelectInput renders a tray as a child, this is state that says whether the tray is open or not */
  isSelectTrayOpen?: boolean;
  /** Event handler for when the Select Input trigger is pressed */
  onPress?: NoopFn;
  /** Optional string placed above the input (or within if compact is enabled) to indicate purpose of the input */
  label?: string;
} & SharedProps &
  Pick<InputStackBaseProps, 'width' | 'disabled' | 'variant'> &
  SharedAccessibilityProps &
  Omit<SharedInputProps, 'label'>;
