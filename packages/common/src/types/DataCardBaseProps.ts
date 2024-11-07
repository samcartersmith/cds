import type { CardBaseProps } from './CardBaseProps';
import type { ProgressColor } from './ProgressBaseProps';
import type { SharedProps } from './SharedProps';

export type DataCardBaseProps = {
  /** Text to be displayed in TextHeadline under CardHeader section. */
  title: string;
  /** Text to be displayed in TextLabel2 under title. */
  description: string;
  startLabel?: string;
  endLabel?: string;
  progressVariant?: 'bar' | 'circle';
  progress?: number;
  progressColor?: ProgressColor;
} & CardBaseProps &
  SharedProps;
