import { ThemeVars } from '../core/theme';

import { ElevationProps } from './ElevationLevels';
import { SharedProps } from './SharedProps';

export type GapSpacing = ThemeVars.Space;

export type BaseTooltipPlacement = 'top' | 'bottom' | 'right' | 'left';

export type TooltipBaseProps = {
  children: React.ReactElement;
  /** The content to render within the tooltip. */
  content: React.ReactNode;
  /**
   * This value corresponds to how big the gap between the subject and the tooltip is.
   * We do not encourage usage of this prop. But it is enabled for special cases as an escape hatch.
   * @default 1
   */
  gap?: GapSpacing;
  /**
   * Control whether the tooltip is shown or hidden.
   * @default true
   */
  visible?: boolean;
  /** Invert the the color spectrum for the tooltip content
   * @default true
   */
  invertSpectrum?: boolean;
} & SharedProps &
  ElevationProps;
