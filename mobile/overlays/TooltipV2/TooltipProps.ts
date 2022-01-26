import { ReactNode } from 'react';
import { LayoutRectangle } from 'react-native';

export type Placement = 'bottom' | 'top';

export type TooltipProps = {
  /** The element that the tooltip references. */
  children: ReactNode;
  /** Logic that needs to be run after the user acknowledges the tooltip */
  onCloseTooltip?: () => void;
  /** Content to render within the toolip. */
  content: NonNullable<ReactNode>;
  /** Position of tooltip in relation to the subject. */
  placement?: Placement;
};

/** The Subject is the element that the tooltip is referencing. */
export type SubjectLayout = {
  width: number;
  height: number;
  pageOffsetX: number;
  pageOffsetY: number;
};

export type UseTooltipPositionParams = {
  placement: TooltipProps['placement'];
  subjectLayout: SubjectLayout | undefined;
  tooltipLayout: LayoutRectangle;
};
