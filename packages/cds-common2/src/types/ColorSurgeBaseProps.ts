import { ThemeVars } from '../new/vars';

import { HintMotionBaseProps } from './MotionBaseProps';

export type ColorSurgeBaseProps = {
  /**
   * Palette alias of the surge color
   * @default primary
   */
  background?: ThemeVars.Color;
} & HintMotionBaseProps;

export type ColorSurgeRefBaseProps = {
  play: (background?: ThemeVars.Color) => Promise<void>;
};
