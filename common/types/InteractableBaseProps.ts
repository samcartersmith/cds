import { BorderRadius } from './BorderRadius';
import { BorderWidth } from './BorderWidth';
import { ElevationLevels } from './ElevationLevels';
import { PaletteAlias, PaletteBorder } from './Palette';

export interface InteractableBaseProps {
  /** Background color of the overlay (element being interacted with). */
  backgroundColor: PaletteAlias | 'transparent';
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element being interacted with. */
  borderColor?: PaletteBorder | 'transparent';
  /** Border radius of the element being interacted with. */
  borderRadius?: BorderRadius;
  /** Width of the border. */
  borderWidth?: BorderWidth;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /** Is the element elevated. */
  elevation?: ElevationLevels;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /** Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc). */
  transparentWhileInactive?: boolean;
}
