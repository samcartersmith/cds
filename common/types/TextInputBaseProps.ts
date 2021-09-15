import { InputBaseProps } from './InputBaseProps';
import { SharedProps } from './SharedProps';

export type TextInputBaseProps = {
  /** Short messageArea indicating purpose of input */
  label: string;
  /**
   * For cases where label is not enough information
   * to describe what the text input is for. Can also be used for
   * showing positive/negative messages
   */
  description?: string;
  /**
   * Aligns text inside input
   * @default left
   */
  textAlignInput?: 'left' | 'right';
  /**
   * Aligns description text
   * @default left
   */
  textAlignDescription?: 'left' | 'right';
} & SharedProps &
  Pick<InputBaseProps, 'variant' | 'startContent' | 'endContent' | 'width' | 'disabled'>;
