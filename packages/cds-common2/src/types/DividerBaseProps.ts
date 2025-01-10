import { ThemeVars } from '../core/theme';

export type DividerBaseProps = {
  /**
   * Color of the divider line.
   * @default line
   */
  color?: ThemeVars.Color;
  /**
   * The direction to render the divider line.
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
};
