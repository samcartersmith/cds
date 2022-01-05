import React, { memo, useCallback } from 'react';
import { ChartFormatAmount } from '../types/Chart';
import { InteractiveSparklineBaseProps } from '../types/InteractiveSparklineBaseProps';

export type ChartPeriod = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

type PriceChartProps = Omit<
  InteractiveSparklineBaseProps<ChartPeriod>,
  'periods' | 'defaultPeriod' | 'formatAmount' | 'formatDate'
> &
  Partial<Pick<InteractiveSparklineBaseProps<ChartPeriod>, 'defaultPeriod'>> & {
    hideHoverDate?: boolean;
    hideMinMaxLabel?: boolean;
  };

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

const getDateHoverOptions = (period: ChartPeriod) => {
  switch (period) {
    case 'hour':
    case 'day':
    case 'week':
    case 'month':
      return {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      } as const;
    default:
      return {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      } as const;
  }
};

type InteractiveSparklineBuilderComponentProps<Period extends string> =
  InteractiveSparklineBaseProps<Period> & {
    hideMinMaxLabel?: boolean;
    formatAmount: ChartFormatAmount;
  };

type InteractiveSparklineBuilderProps = {
  InteractiveSparkline: React.ComponentType<InteractiveSparklineBuilderComponentProps<ChartPeriod>>;
};

export const interactiveSparklineBuilder = ({
  InteractiveSparkline,
}: InteractiveSparklineBuilderProps) => {
  return memo(({ defaultPeriod, hideHoverDate, ...props }: PriceChartProps) => {
    const formatDateWithConfig = useCallback((value: Date, period: ChartPeriod) => {
      const config = getFormattingConfigForPeriod(period);
      return value.toLocaleString('en-US', config);
    }, []);

    const formatHoverDate = useCallback((date: Date, period: ChartPeriod) => {
      return date.toLocaleString('en-US', getDateHoverOptions(period));
    }, []);

    const formatAmount = useCallback((amount: number | string) => {
      return `$${parseInt(amount as string, 10).toLocaleString()}`;
    }, []);

    return (
      <InteractiveSparkline
        {...props}
        periods={periods}
        formatDate={formatDateWithConfig}
        formatHoverDate={!hideHoverDate ? formatHoverDate : undefined}
        defaultPeriod={defaultPeriod ?? DEFAULT_CHART_PERIOD}
        formatAmount={formatAmount}
      />
    );
  });
};
