import React, { ReactNode } from 'react';
import { Area, Line } from 'd3-shape';

import type {
  ChartData,
  ChartDataPoint,
  ChartFormatAmount,
  ChartFormatDate,
  ChartGetMarker,
  ChartScrubParams,
  ChartTimeseries,
  ChartXFunction,
} from './Chart';
import { SpacingScale } from './SpacingScale';
import type { SparklineScalingBaseProps } from './SparklineBaseProps';

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
   * If you use the default fallback then this specifies if the fallback line is decreasing or increasing
   */
  fallbackType?: 'positive' | 'negative';

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

  /**
   *  Optional data to show on hover/scrub instead of the original sparkline. This allows multiple timeseries lines.
   *
   *  Period => timeseries list
   */
  hoverData?: Record<Period, ChartTimeseries[]>;

  /**
   * Optional gutter to add to the Period selector. This is useful if you choose to use the full screen width for the chart
   */
  timePeriodGutter?: SpacingScale;
} & SparklineScalingBaseProps;

export type SparklineInteractiveContentProps<Period extends string> = Omit<
  SparklineInteractiveBaseProps<Period>,
  'compact'
>;

export type SparklineInteractiveMinMaxProps = {
  dataPoint: ChartDataPoint | undefined;
  formatMinMaxLabel: ChartFormatAmount;
  xFunction: ChartXFunction;
};

export type SparklineInteractiveScrubHandlerProps = {
  onScrubEnd?: () => void;
  onScrubStart?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

export type SparklineInteractiveAnimatedPathProps = {
  d: string;
  color: string;
  area?: string;
  selectedPeriod: string;
  yAxisScalingFactor?: number;
  initialPath?: string;
  initialArea?: string;
};

export type SparklineInteractiveMarkerDatesProps<Period extends string> = {
  getMarker: ChartGetMarker;
  formatDate: ChartFormatDate<Period>;
  selectedPeriod: Period;
  timePeriodGutter?: SpacingScale;
};

export type SparklineInteractivePeriodSelectorProps<Period extends string> = {
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
  periods: { label: string; value: Period }[];
  color: string;
};

export type SparklineInteractivePeriodProps<Period extends string> = {
  period: { label: string; value: Period };
  selectedPeriod: Period;
  setSelectedPeriod: SparklineInteractivePeriodSelectorProps<Period>['setSelectedPeriod'];
  color: string;
};

export type SparklineInteractiveLineVerticalProps = {
  color: string;
};

export type SparklineInteractiveHoverDateRefProps<Period extends string> = {
  update: (params: ChartScrubParams<Period>) => void;
};

export type SparklineInteractiveDefaultFallback = Pick<
  SparklineInteractiveBaseProps<string>,
  'fallbackType' | 'compact'
>;

export type SparklineInteractivePathsProps<Period extends string> = Pick<
  SparklineInteractiveBaseProps<Period>,
  'fill' | 'yAxisScalingFactor' | 'strokeColor' | 'hoverData' | 'compact'
> & {
  showHoverData: boolean;
  path: string;
  area: string;
  selectedPeriod: Period;
};

export type TimeseriesPathOnRenderParams = {
  path: string;
  area: string;
};

export type SparklineInteractiveTimeseriesPathsProps = {
  initialPath: string;
  data: ChartTimeseries[];
  width: number;
  height: number;
  onRender: ({ path, area }: TimeseriesPathOnRenderParams) => void;
};

export type TimeseriesPathProps = {
  lineFn: Line<ChartDataPoint>;
  areaFn: Area<ChartDataPoint>;
  timeseries: ChartTimeseries;
  initialPath: string;
  onRender?: ({ path, area }: TimeseriesPathOnRenderParams) => void;
};
