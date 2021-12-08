import React, { memo, useCallback, useMemo } from 'react';
import pick from 'lodash/pick';
import { ChartData, ChartDataPoint, ChartFormatAmount } from '@cbhq/cds-common/types';
import { chartFallbackPositive } from '@cbhq/cds-lottie-files/chartFallbackPositive';
import { Lottie } from '../../../animation';
import { ThemeProvider } from '../../../system/ThemeProvider';

import { Chart } from '../Chart';

type ChartPeriod = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

type OnScrubParams = {
  point: ChartDataPoint;
  period: ChartPeriod;
  change?: number | undefined;
};

export type PriceChartProps = {
  data?: Record<ChartPeriod, ChartData>;
  strokeColor?: string;
  formatAmount: ChartFormatAmount;
  compact?: boolean;
  onScrub?: ({ point, period, change }: OnScrubParams) => void;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
  onPeriodChanged?: (period: ChartPeriod) => void;
  isChartHeightExperiment?: boolean;
};

export const DEFAULT_CHART_PERIOD = 'day';

const i18nKey = 'PriceChart';
export const messages = {
  hourPeriod: {
    id: `${i18nKey}.hourPeriod`,
    defaultMessage: '1H',
    description:
      '1H indicates 1 hour, please translate this to be 1(first letter of translated word for hour)',
  },
  dayPeriod: {
    id: `${i18nKey}.dayPeriod`,
    defaultMessage: '1D',
    description:
      '1D indicates 1 day, please translate this to be 1(first letter of translated word for day)',
  },
  weekPeriod: {
    id: `${i18nKey}.weekPeriod`,
    defaultMessage: '1W',
    description:
      '1W indicates 1 week, please translate this to be 1(first letter of translated word for week)',
  },
  monthPeriod: {
    id: `${i18nKey}.monthPeriod`,
    defaultMessage: '1M',
    description:
      '1M indicates 1 month, please translate this to be 1(first letter of translated word for month)',
  },
  yearPeriod: {
    id: `${i18nKey}.yearPeriod`,
    defaultMessage: '1Y',
    description:
      '1Y indicates 1 year, please translate this to be 1(first letter of translated word for year)',
  },
  AllTime: {
    id: `${i18nKey}.AllTime`,
    defaultMessage: 'All',
    description:
      'All indicates all time periods when viewing a chart. Please use the shortest possible translation of the word all',
  },
};

const usePeriods = () => {
  return useMemo(
    () => [
      { label: messages.hourPeriod.defaultMessage, value: 'hour' as const },
      {
        label: messages.dayPeriod.defaultMessage,
        value: 'day' as const,
      },
      {
        label: messages.weekPeriod.defaultMessage,
        value: 'week' as const,
      },
      {
        label: messages.monthPeriod.defaultMessage,
        value: 'month' as const,
      },
      {
        label: messages.yearPeriod.defaultMessage,
        value: 'year' as const,
      },
      {
        label: messages.AllTime.defaultMessage,
        value: 'all' as const,
      },
    ],
    [],
  );
};

export const useValidChartPeriodsPicker = () => {
  const periods = usePeriods();
  return useCallback(
    <T extends Partial<{ [K in ChartPeriod]: unknown }> = Record<string, unknown>>(
      periodObject: T,
    ) => {
      return pick(
        periodObject,
        periods.map((item) => item.value),
      );
    },
    [periods],
  );
};

// eslint-disable-next-line consistent-return
const getFormattingConfigForPeriod = (period: ChartPeriod) => {
  // eslint-disable-next-line default-case
  switch (period) {
    case 'hour':
    case 'day':
      return {
        hour: 'numeric',
        minute: 'numeric',
      } as const;

    case 'week':
    case 'month':
      return {
        month: 'numeric',
        day: 'numeric',
      } as const;

    case 'year':
    case 'all':
      return {
        month: 'numeric',
        year: 'numeric',
      } as const;
  }
};

export const PriceChart = memo(
  ({
    data,
    strokeColor,
    onScrub,
    onScrubStart,
    onScrubEnd,
    onPeriodChanged,
    formatAmount,
    compact = false,
    isChartHeightExperiment = false,
  }: PriceChartProps) => {
    const formatDateWithConfig = useCallback((value: Date, period: ChartPeriod) => {
      const config = getFormattingConfigForPeriod(period);
      return value.toLocaleString('en-US', config);
    }, []);

    const periods = usePeriods();
    const fallback = useMemo(() => {
      // We override line palette since default line color is a bit too dark.
      // Changing to gray20 more closely matches the line color currently used in production
      return (
        <ThemeProvider palette={{ line: 'gray20' }}>
          <Lottie autoplay source={chartFallbackPositive} loop />
        </ThemeProvider>
      );
    }, []);

    const handleScrubStart = useCallback(() => {
      onScrubStart?.();
    }, [onScrubStart]);

    const handleScrubEnd = useCallback(() => {
      onScrubEnd?.();
    }, [onScrubEnd]);

    return (
      <Chart
        data={data}
        periods={periods}
        defaultPeriod={DEFAULT_CHART_PERIOD}
        onPeriodChanged={onPeriodChanged}
        strokeColor={strokeColor}
        onScrub={onScrub}
        onScrubStart={handleScrubStart}
        onScrubEnd={handleScrubEnd}
        formatAmount={formatAmount}
        formatDate={formatDateWithConfig}
        fallback={fallback}
        compact={compact}
        isChartHeightExperiment={isChartHeightExperiment}
      />
    );
  },
);
