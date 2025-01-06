import { ThemeVars } from '../new/vars';

import { HintMotionBaseProps } from './MotionBaseProps';
import type { SharedAccessibilityProps } from './SharedAccessibilityProps';
import type { SharedProps } from './SharedProps';
import type { Weight } from './Weight';

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
  color?: ThemeVars.Color;
} & SharedProps &
  Pick<HintMotionBaseProps, 'disableAnimateOnMount'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;
