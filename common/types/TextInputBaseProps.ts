import { InputBaseProps } from './InputBaseProps';
import { SharedProps } from './SharedProps';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { TextAlignProps } from './TextBaseProps';

export type TextInputBaseProps = {
  /** Short messageArea indicating purpose of input */
  label: string;
  /** Placeholder text */
  placeholder?: string;
  /**
   * For cases where label is not enough information
   * to describe what the text input is for. Can also be used for
   * showing positive/negative messages
   */
  helperText?: string;
  /**
   * Aligns text inside input and helperText
   * @default start
   */
  align?: TextAlignProps['align'];
  /**
   * Enables compact variation
   * @default false
   */
  compact?: boolean;
  /**
   * Adds suffix text to the end of input
   */
  suffix?: string;
  /** Adds content to the start of the inner input. Refer to diagram for location of startNode in InputStack component */
  start?: React.ReactNode;
  /** Adds content to the end of the inner input. Refer to diagram for location of endNode in InputStack component */
  end?: React.ReactNode;
} & SharedProps &
  SharedAccessibilityProps &
  Pick<InputBaseProps, 'variant' | 'width' | 'disabled'>;
