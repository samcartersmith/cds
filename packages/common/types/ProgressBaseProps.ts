import type { PaletteForeground } from './Palette';
import type { SharedProps } from './SharedProps';
import type { Weight } from './Weight';

export type ProgressColor = Extract<
  PaletteForeground,
  'positive' | 'negative' | 'primary' | 'foreground'
>;

export type ProgressBaseProps = {
  /** Number between 0-1 representing the progress percentage */
  progress: number;

  /** Toggle used to change thickness of progress visualization
   * @default normal
   * */
  weight?: Weight;

  /**
   * Toggle used to show a disabled progress visualization
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom progress color.
   * @default primary
   */
  color?: ProgressColor;
} & SharedProps;
