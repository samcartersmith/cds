import {
  BaseTooltipPlacement,
  GapSpacing,
  PositionStyles,
  TooltipBaseProps,
} from '@cbhq/cds-common/types';

type TooltipPlacement = BaseTooltipPlacement;

/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
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

/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
export type PopperTooltipProps = {
  gap: GapSpacing;
} & Pick<TooltipProps, 'content' | 'testID' | 'zIndex' | 'tooltipId' | 'placement'>;
