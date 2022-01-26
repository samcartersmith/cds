import { NoopFn } from '@cbhq/cds-common/types';
import { BasePlacement } from '@popperjs/core/lib/enums';

type TooltipPlacement = BasePlacement;

export type PopperTooltipProps = {
  handleOnMouseEnter: NoopFn;
  handleOnMouseLeave: NoopFn;
  popperStyles: Record<string, React.CSSProperties>;
  popperAttributes: Record<string, Record<string, string> | undefined>;
} & Pick<TooltipProps, 'content'>;

export type TooltipProps = {
  children: React.ReactNode;
  /** Content to render within the tooltip. */
  content: React.ReactNode;
  /** The direction and alignment of the positioned tooltip. */
  placement?: TooltipPlacement;
  /**
   * @default 8
   * TODO: use spacing
   * An override for the gap between the subject and the tooltip.
   */
  gapOverride?: number;
};
