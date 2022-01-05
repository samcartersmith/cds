import { ReactNode } from 'react';
import {
  ChartData,
  ChartFormatAmount,
  ChartFormatDate,
  ChartScrubParams,
  SparklineScalingBaseProps,
} from '.';

export type InteractiveSparklineBaseProps<Period extends string> = {
  /**
   * Chart data bucketed by Period. Period is a string key
   */
  data?: Record<Period, ChartData>;

  /**
   * A list of periods that the chart will use. label is what is shown in the bottom of the chart and the value is the key.
   */
  periods: { label: string; value: Period }[];

  /**
   * default period value that the chart will use
   */
  defaultPeriod: Period;

  /**
   * Callback when the user selects a new period.
   */
  onPeriodChanged?: (period: Period) => void;

  /**
   * Callback when the user starts scrubbing
   */
  onScrubStart?: () => void;

  /**
   * Callback when a user finishes scrubbing
   */
  onScrubEnd?: () => void;

  /**
   * Callback used when the user is scrubbing. This will be called for every data point change.
   */
  onScrub?: (params: ChartScrubParams<Period>) => void;

  /**
   * Disables the scrub user interaction from the chart
   *
   * @default false
   */
  disableScrubbing?: boolean;

  /**
   * function used to format the amount of money used in the minMaxLabel
   */
  formatAmount: ChartFormatAmount;

  /**
   * function used to format the date that is shown in the bottom of the chart as the user scrubs
   */
  formatDate: ChartFormatDate<Period>;

  /**
   * Color of the line
   *
   * @default primary palette color
   */
  strokeColor?: string;

  /**
   * Fallback shown in the chart when data is not available. This is usually a loading state.
   */
  fallback?: ReactNode;

  /**
   * Show the chart in compact height
   *
   * @default false
   */
  compact?: boolean;

  /**
   * Hides the min and max label
   *
   * @default false
   */
  hideMinMaxLabel?: boolean;

  /**
   * Hides the period selector at the bottom of the chart
   *
   * @default false
   */
  hidePeriodSelector?: boolean;

  /*
   * Adds an area fill to the Sparkline
   *
   * @default true for frontier false otherwise
   */
  fill?: boolean;
} & SparklineScalingBaseProps;
