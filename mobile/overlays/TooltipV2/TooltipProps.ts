import { NoopFn } from '@cbhq/cds-common';
import { BaseTooltipPlacement, TooltipBaseProps } from '@cbhq/cds-common/types/TooltipBaseProps';
import { LayoutRectangle, Animated } from 'react-native';

export type TooltipPlacement = Extract<BaseTooltipPlacement, 'bottom' | 'top'>;

export type TooltipProps = {
  /** Position of tooltip in relation to the subject. */
  placement?: TooltipPlacement;
  /** This callback runs when the tooltip is closed; either by press outside the toolip or on back button press. */
  onCloseTooltip?: NoopFn;
} & TooltipBaseProps;

/** The Subject is the element that the tooltip is referencing. */
export type SubjectLayout = {
  width: number;
  height: number;
  pageOffsetX: number;
  pageOffsetY: number;
};

export type InternalTooltipProps = {
  subjectLayout: SubjectLayout | undefined;
  opacity: Animated.Value;
  animateIn: Animated.CompositeAnimation;
  translateY: Animated.Value;
} & Pick<TooltipProps, 'content' | 'placement'>;

export type UseTooltipPositionParams = {
  placement: TooltipProps['placement'];
  subjectLayout: SubjectLayout | undefined;
  tooltipLayout: LayoutRectangle;
};
