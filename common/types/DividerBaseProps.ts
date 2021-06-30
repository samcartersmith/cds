import { PaletteBorder } from './Palette';

export interface DividerBaseProps {
  /**
   * Color of the divider line.
   * @default line
   */
  color?: Extract<PaletteBorder, 'line' | 'lineHeavy'>;
  /**
   * The direction to render the divider line.
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
}
