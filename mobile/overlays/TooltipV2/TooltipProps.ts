import { NoopFn } from '@cbhq/cds-common';
import { BaseTooltipPlacement, TooltipBaseProps } from '@cbhq/cds-common/types/TooltipBaseProps';
import { LayoutRectangle, Animated } from 'react-native';

export type TooltipPlacement = Extract<BaseTooltipPlacement, 'bottom' | 'top'>;

export type TooltipProps = {
  /** Position of tooltip in relation to the subject. */
  placement?: TooltipPlacement;
  /** This callback executes when the tooltip is closed; either by press outside the toolip or on back button press for android. */
  onCloseTooltip?: NoopFn;
  /**
   * @danger this prop only takes affect on Android and should only be used for a very specific measurement edge case described here.
   * There is a known RN Modal Modal bug where screen measurements are offset by the status bar when statusBarTranslucent=false.
   * This prop acts as the escape hatch to mitigate this; by setting true one can shift the y position of the tooltip to account for this bug.
   * @default false
   */
  yShiftByStatusBarHeight?: boolean;
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
} & Pick<TooltipProps, 'content' | 'placement' | 'gap' | 'testID' | 'yShiftByStatusBarHeight'>;

export type UseTooltipPositionParams = {
  subjectLayout: SubjectLayout | undefined;
  tooltipLayout: LayoutRectangle;
} & Pick<TooltipProps, 'placement' | 'yShiftByStatusBarHeight'>;
