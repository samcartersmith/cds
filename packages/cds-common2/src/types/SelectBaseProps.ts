import { InputStackBaseProps, SharedInputProps } from './InputBaseProps';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type SelectRenderMenu = React.FC<{ closeMenu: () => void }>;

export type SelectBaseProps = {
  children?: React.ReactNode;
  /** Pass a value that will prepopulate the select input. This will replace the placeholder text. */
  value?: string;
  /** Optional label for selected value when using a value/label object model */
  valueLabel?: string;
  /** Event handler for when the Select Input trigger is pressed */
  onPress?: () => void;
  /** Optional string placed above the input (or within if compact is enabled) to indicate purpose of the input */
  label?: string;
  /** Callback that is fired whenever a select option is selected */
  onChange?: ((newValue: string) => void) | React.Dispatch<React.SetStateAction<string>>;
  /**
   * Determines the sentiment of the input.
   * Sets styles on the input border and helper text.
   * @default foregroundMuted
   */
  variant?: Exclude<InputStackBaseProps['variant'], 'secondary'>;
} & SharedProps &
  Pick<InputStackBaseProps, 'width' | 'disabled' | 'focused' | 'startNode'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Omit<SharedInputProps, 'label'>;
