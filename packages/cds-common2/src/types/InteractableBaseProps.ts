import { ThemeVars } from '../core/theme';

import { ElevationLevels } from './ElevationLevels';

export type InteractableBaseProps = {
  /** Background color of the overlay (element being interacted with). */
  background: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element being interacted with. */
  borderColor?: ThemeVars.Color;
  /** Border radius of the element being interacted with. Number should only be used if value comes from useButtonBorderRadius. */
  borderRadius?: ThemeVars.BorderRadius | number;
  /** Width of the border. */
  borderWidth?: ThemeVars.BorderWidth;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /** Is the element elevated. */
  elevation?: ElevationLevels;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /** Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc). */
  transparentWhileInactive?: boolean;
  /** Mark the background and border as transparent even while element is interacted with (elevation underlay issue). */
  transparentWhilePressed?: boolean;
};
