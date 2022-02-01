import {
  NoopFn,
  TooltipBaseProps,
  GapSpacing,
  BaseTooltipPlacement,
  SetState,
} from '@cbhq/cds-common/types';

type TooltipPlacement = BaseTooltipPlacement;

export type TooltipProps = {
  /** Position of tooltip in relation to the subject. */
  placement?: TooltipPlacement;
  /**
   * The `children` will be inside the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean;
} & TooltipBaseProps;

export type PopperTooltipProps = {
  setPopper: SetState<HTMLDivElement | null>;
  popperStyles: Record<string, React.CSSProperties>;
  popperAttributes: Record<string, Record<string, string> | undefined>;
  gap: GapSpacing;
  animateIn: NoopFn;
} & Pick<TooltipProps, 'content'>;

export type PortalProps = Pick<TooltipProps, 'disablePortal'>;
