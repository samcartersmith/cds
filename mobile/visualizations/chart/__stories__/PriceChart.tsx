import React, { memo, useCallback, useMemo } from 'react';
import { chartFallbackPositive } from '@cbhq/cds-lottie-files/chartFallbackPositive';
import { Lottie } from '../../../animation';
import { ThemeProvider } from '../../../system/ThemeProvider';

import { SparklineContainer, SparklineContainerProps } from '../SparklineContainer';

type ChartPeriod = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

type PriceChartProps = Omit<
  SparklineContainerProps<ChartPeriod>,
  'periods' | 'defaultPeriod' | 'formatAmount' | 'formatDate'
> &
  Partial<Pick<SparklineContainerProps<ChartPeriod>, 'defaultPeriod'>>;

export const DEFAULT_CHART_PERIOD = 'day';

const periods = [
  {
    label: '1H',
    value: 'hour' as const,
  },
  {
    label: '1D',
    value: 'day' as const,
  },
  {
    label: '1W',
    value: 'week' as const,
  },
  {
    label: '1M',
    value: 'month' as const,
  },
  {
    label: '1Y',
    value: 'year' as const,
  },
  {
    label: 'All',
    value: 'all' as const,
  },
];

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

export const PriceChart = memo(({ defaultPeriod, ...props }: PriceChartProps) => {
  const formatDateWithConfig = useCallback((value: Date, period: ChartPeriod) => {
    const config = getFormattingConfigForPeriod(period);
    return value.toLocaleString('en-US', config);
  }, []);

  const fallback = useMemo(() => {
    // We override line palette since default line color is a bit too dark.
    // Changing to gray20 more closely matches the line color currently used in production
    return (
      <ThemeProvider palette={{ line: 'gray20' }}>
        <Lottie autoplay source={chartFallbackPositive} loop />
      </ThemeProvider>
    );
  }, []);

  const formatAmount = useCallback((amount: number | string) => {
    return `$${parseInt(amount as string, 10).toLocaleString()}`;
  }, []);

  return (
    <SparklineContainer
      {...props}
      periods={periods}
      formatDate={formatDateWithConfig}
      fallback={fallback}
      defaultPeriod={defaultPeriod ?? DEFAULT_CHART_PERIOD}
      formatAmount={formatAmount}
    />
  );
});
