import type { ProgressColor } from '../ProgressBaseProps';
import type { SharedProps } from '../SharedProps';

import type { CardBaseProps } from './CardBaseProps';

export type DataCardBaseProps<OnPressFn> = {
  /** Text to be displayed in TextHeadline under CardHeader section. */
  title: string;
  /** Text to be displayed in TextLabel2 under title. */
  description: string;
  onPress?: OnPressFn;
  startLabel?: string;
  endLabel?: string;
  progressVariant?: 'bar' | 'circle';
  progress?: number;
  progressColor?: ProgressColor;
} & CardBaseProps<OnPressFn> &
  SharedProps;
