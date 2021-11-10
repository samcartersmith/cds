import { InputStackBaseProps, SharedInputProps } from './InputBaseProps';
import { SharedProps } from './SharedProps';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { TextAlignProps } from './TextBaseProps';

export type TextInputBaseProps = {
  /**
   * Aligns text inside input and helperText
   * @default start
   */
  align?: TextAlignProps['align'];
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
  Pick<InputStackBaseProps, 'variant' | 'width' | 'disabled'> &
  SharedInputProps;
