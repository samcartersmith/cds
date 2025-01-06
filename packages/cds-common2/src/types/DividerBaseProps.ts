import { ThemeVars } from '../new/vars';

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
