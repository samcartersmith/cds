import { InputBaseProps } from './InputBaseProps';
import { SharedProps } from './SharedProps';
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
   * Aligns text inside input
   * @default start
   */
  textAlignInput?: TextAlignProps['align'];
  /**
   * Aligns description text
   * @default start
   */
  textAlignHelperText?: TextAlignProps['align'];
  /**
   * Enables compact variation
   * @default false
   */
  compact?: boolean;
  /**
   * Adds suffix text to the end of input
   */
  suffix?: string;
} & SharedProps &
  Pick<InputBaseProps, 'variant' | 'startContent' | 'endContent' | 'width' | 'disabled'>;
