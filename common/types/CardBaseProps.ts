import type { PinningDirection } from './BoxBaseProps';
import type { DimensionStyles } from './DimensionStyles';
import type { ElevationLevels } from './ElevationLevels';
import type { PaletteBackground } from './Palette';
import type { SharedProps } from './SharedProps';
import type { OffsetProps, SpacingProps } from './SpacingProps';

export interface CardBaseProps extends DimensionStyles, OffsetProps, SharedProps, SpacingProps {
  /** Set the background color of the Card. Passing `true` will enable the default background, otherwise a custom palette alias can be passed. **/
  background?: true | Exclude<PaletteBackground, 'divider' | 'stroke'>;
  /** Determines box shadow styles. Parent should have overflow set to visible to ensure styles are not clipped. */
  elevation?: ElevationLevels;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Size of the card. Small and medium have fixed widths and large grows with its children. */
  size?: 'small' | 'medium' | 'large';
}
