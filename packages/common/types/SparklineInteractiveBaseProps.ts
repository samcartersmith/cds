import React, { ReactNode } from 'react';
import {
  ChartData,
  ChartDataPoint,
  ChartFormatAmount,
  ChartFormatDate,
  ChartGetMarker,
  ChartScrubParams,
  ChartXFunction,
  SparklineScalingBaseProps,
} from '.';

export type SparklineInteractiveBaseProps<Period extends string> = {
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
   * function used to format the date that is shown in the bottom of the chart as the user scrubs
   */
  formatDate: ChartFormatDate<Period>;

  /**
   * Color of the line*
   */
  strokeColor: string;

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
   * Hides the period selector at the bottom of the chart
   *
   * @default false
   */
  hidePeriodSelector?: boolean;

  /**
   * Adds an area fill to the Sparkline
   *
   * @default true for frontier false otherwise
   */
  fill?: boolean;

  /**
    Formats the date above the chart as you scrub. Omit this if you don't want to show the date as the user scrubs
   */
  formatHoverDate?: (date: Date, period: Period) => string;

  /**
   * Adds a header node above the chart. It will be placed next to the period selector on web.
   */
  headerNode?: ReactNode;
} & SparklineScalingBaseProps;

export type SparklineInteractiveContentProps<Period extends string> = Omit<
  SparklineInteractiveBaseProps<Period>,
  'compact'
>;

export type ChartMinMaxProps = {
  dataPoint: ChartDataPoint | undefined;
  formatAmount: ChartFormatAmount;
  xFunction: ChartXFunction;
};

export type ChartScrubHandlerProps = {
  onScrubEnd?: () => void;
  onScrubStart?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

export type ChartAnimatedPathProps = {
  d: string;
  color: string;
  area?: string;
  selectedPeriod: string;
  yAxisScalingFactor: number;
};

export type ChartMarkerDatesProps<Period extends string> = {
  getMarker: ChartGetMarker;
  formatDate: ChartFormatDate<Period>;
  selectedPeriod: Period;
};

export type GetFormattedDateParams<Period extends string> = {
  getMarker: ChartGetMarker;
  formatDate: ChartFormatDate<Period>;
  selectedPeriod: Period;
};

export type ChartPeriodSelectorProps<Period extends string> = {
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
  periods: { label: string; value: Period }[];
  color: string;
};

export type ChartPeriodProps<Period extends string> = {
  period: { label: string; value: Period };
  selectedPeriod: Period;
  setSelectedPeriod: ChartPeriodSelectorProps<Period>['setSelectedPeriod'];
  color: string;
};

export type ChartLineVerticalProps = {
  color: string;
};

export type ChartHoverDateRefProps<Period extends string> = {
  update: (params: ChartScrubParams<Period>) => void;
};
