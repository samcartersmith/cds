import { ThemeVars } from '../core/theme';

import { FlexStyles } from './BoxBaseProps';

export type SpacerBaseProps = Pick<FlexStyles, 'flexGrow' | 'flexShrink' | 'flexBasis'> & {
  /** Padding in the horizontal direction */
  horizontal?: ThemeVars.Space;
  /** Padding in the vertical direction */
  vertical?: ThemeVars.Space;
  /** Max padding in the horizontal direction */
  maxHorizontal?: ThemeVars.Space;
  /** Max padding in the vertical direction */
  maxVertical?: ThemeVars.Space;
  /** Min padding in the horizontal direction */
  minHorizontal?: ThemeVars.Space;
  /** Min padding in the vertical direction */
  minVertical?: ThemeVars.Space;
};
