import {
  BaseTooltipPlacement,
  GapSpacing,
  PositionStyles,
  TooltipBaseProps,
} from '@cbhq/cds-common/types';

type TooltipPlacement = BaseTooltipPlacement;

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export type TooltipProps = {
  /** Position of tooltip in relation to the subject. */
  placement?: TooltipPlacement;
  /**
   * @danger
   * By setting this to true you are essentially opting out of CDS zIndex management. By default the subject is rendered in a portal. If set to true the subject will be rendered in the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean;
  /**
   * Typically only used when disablePortal is set to true to adjust zIndex of tooltip. When using portal this value should remain as default.
   * @default 4
   * */
  zIndex?: PositionStyles['zIndex'];
  /**
   * A unique ID used to ensure tooltips are accessible
   */
  tooltipId?: string;
} & TooltipBaseProps;

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export type PopperTooltipProps = {
  gap: GapSpacing;
  /**
   * A unique ID used to ensure tooltips are accessible
   */
  tooltipId?: string;
} & Pick<TooltipProps, 'content' | 'testID' | 'zIndex' | 'placement'>;
