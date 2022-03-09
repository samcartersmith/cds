import type { ProgressBaseProps } from './ProgressBaseProps';

export type ProgressCircleBaseProps = {
  /** Toggle used to hide the inner circle percentage */
  hideText?: boolean;

  /** Optional size in px for the visualization. This is useful if the visualization is used in an HStack. If this is omitted the visualization will fill the parent width or height. Since it's a circular visualization it will fill the smaller of the parent width or height. */
  size?: number;
} & ProgressBaseProps;

export type ProgressCircleTextBaseProps = Pick<ProgressCircleBaseProps, 'progress' | 'disabled'>;

export type ProgressInnerCircleBaseProps = Pick<ProgressCircleBaseProps, 'progress' | 'disabled'> &
  Required<Pick<ProgressCircleBaseProps, 'size' | 'weight' | 'color'>>;
