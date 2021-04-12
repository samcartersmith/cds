import { BorderRadius } from './BorderRadius';
import { BorderWidth } from './BorderWidth';
import { PaletteBackground, PaletteBorder } from './Palette';

export interface InteractableBaseProps {
  /** Background color of the overlay (element being interacted with). */
  backgroundColor: PaletteBackground;
  /** Border color of the element being interacted with. */
  borderColor?: PaletteBorder;
  /** Border radius of the element being interacted with. */
  borderRadius?: BorderRadius;
  /** Width of the border. */
  borderWidth?: BorderWidth;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /** Is the element being pressed. */
  pressed?: boolean;
}
