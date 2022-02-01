import { SpacingScale } from './SpacingScale';

export type GapSpacing = Extract<SpacingScale, 0 | 1 | 2>;

export type BaseTooltipPlacement = 'top' | 'bottom' | 'right' | 'left';

export type TooltipBaseProps = {
  children: React.ReactNode;
  /** Content to render within the tooltip. */
  content: React.ReactNode;
  /**
   * @default 1
   * This value corresponds to how big the gap between the subject and the tooltip is.
   * We do not encourage usage of this prop. But it is enabled for special cases as an escape hatch.
   */
  gap?: GapSpacing;
};
