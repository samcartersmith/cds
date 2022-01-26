import React, { memo, useCallback, useMemo, useRef, useState } from 'react';

import { ChartData, ChartDataPoint, ChartFormatAmount, ChartScrubParams } from '../types/Chart';
import { ChartHeaderProps, ChartHeaderRef, ChartSubHead } from '../types/ChartHeaderBaseProps';
import { SparklineInteractiveBaseProps } from '../types/SparklineInteractiveBaseProps';

export type ChartPeriod = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

type PriceChartProps = Omit<
  SparklineInteractiveBaseProps<ChartPeriod>,
  'periods' | 'defaultPeriod' | 'formatAmount' | 'formatDate'
> &
  Partial<Pick<SparklineInteractiveBaseProps<ChartPeriod>, 'defaultPeriod'>> & {
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

type SparklineInteractiveBuilderComponentProps<Period extends string> =
  SparklineInteractiveBaseProps<Period> & {
    hideMinMaxLabel?: boolean;
    formatAmount: ChartFormatAmount;
  };

type SparklineInteractiveBuilderProps = {
  SparklineInteractive: React.ComponentType<SparklineInteractiveBuilderComponentProps<ChartPeriod>>;
  isMobile: boolean;
};

function numToLocaleString(num: number) {
  return num.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });
}

export const sparklineInteractiveBuilder = ({
  SparklineInteractive,
  isMobile,
}: SparklineInteractiveBuilderProps) => {
  return memo(({ defaultPeriod, hideHoverDate, ...props }: PriceChartProps) => {
    // not supported onAndroid
    const timezoneObj = useMemo(() => {
      const obj: { timeZone?: string } = {};
      if (!isMobile) {
        obj.timeZone = 'America/New_York';
      }

      return obj;
    }, []);

    const formatDateWithConfig = useCallback(
      (value: Date, period: ChartPeriod) => {
        const config = getFormattingConfigForPeriod(period);

        return value.toLocaleString('en-US', {
          ...timezoneObj,
          ...config,
        });
      },
      [timezoneObj],
    );

    const formatHoverDate = useCallback(
      (date: Date, period: ChartPeriod) => {
        return date.toLocaleString('en-US', {
          ...timezoneObj,
          ...getDateHoverOptions(period),
        });
      },
      [timezoneObj],
    );

    const formatAmount = useCallback((amount: number | string) => {
      return `$${numToLocaleString(parseInt(amount as string, 10))}`;
    }, []);

    return (
      <SparklineInteractive
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

function generateSubHead(
  point: ChartDataPoint,
  period: ChartPeriod,
  sparklineInteractiveData: Record<ChartPeriod, ChartData>,
): ChartSubHead {
  const data = sparklineInteractiveData[period];
  const firstPoint = data[0];

  const increase = point.value > firstPoint.value;
  const subHead: ChartSubHead = {
    percent: `${numToLocaleString(
      Math.abs((point.value - firstPoint.value) / firstPoint.value) * 100,
    )}%`,
    sign: increase ? '+' : '–',
    variant: increase ? 'positive' : 'negative',
    priceChange: `$${numToLocaleString(Math.abs(point.value - firstPoint.value))}`,
  };

  return subHead;
}

type SparklineInteractiveWithHeaderBuilderProps = SparklineInteractiveBuilderProps & {
  ChartHeader: React.ForwardRefExoticComponent<
    ChartHeaderProps & React.RefAttributes<ChartHeaderRef>
  >;
};

export const sparklineInteractiveWithHeaderBuilder = ({
  SparklineInteractive,
  ChartHeader,
  isMobile,
}: SparklineInteractiveWithHeaderBuilderProps) => {
  const SparklineInteractiveBuild = sparklineInteractiveBuilder({
    SparklineInteractive,
    isMobile,
  });

  return memo((props: PriceChartProps) => {
    const { data: sparklineData } = props;
    const sparklineInteractiveData = sparklineData as Record<ChartPeriod, ChartData>;
    const chartHeaderRef = useRef<ChartHeaderRef | null>(null);
    const [currentPeriod, setCurrentPeriod] = useState<ChartPeriod>(DEFAULT_CHART_PERIOD);
    const data = sparklineInteractiveData[currentPeriod];
    const lastPoint = data[data.length - 1];

    const handleScrub = useCallback(
      ({ point, period }: ChartScrubParams<ChartPeriod>) => {
        chartHeaderRef.current?.update({
          title: `$${point.value.toLocaleString('en-US')}`,
          subHead: generateSubHead(point, period, sparklineInteractiveData),
        });
      },
      [sparklineInteractiveData],
    );

    const handleScrubEnd = useCallback(() => {
      chartHeaderRef.current?.update({
        title: `$${numToLocaleString(lastPoint.value)}`,
        subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData),
      });
    }, [currentPeriod, sparklineInteractiveData, lastPoint]);

    const handleOnPeriodChanged = useCallback(
      (period: ChartPeriod) => {
        setCurrentPeriod(period);

        const newData = sparklineInteractiveData[period];
        const newLastPoint = newData[newData.length - 1];

        chartHeaderRef.current?.update({
          title: `$${numToLocaleString(newLastPoint.value)}`,
          subHead: generateSubHead(newLastPoint, period, sparklineInteractiveData),
        });
      },
      [sparklineInteractiveData],
    );

    const header = (
      <ChartHeader
        ref={chartHeaderRef}
        defaultLabel="Bitcoin Price"
        defaultTitle={`$${numToLocaleString(lastPoint.value)}`}
        defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)}
      />
    );

    return (
      <SparklineInteractiveBuild
        {...props}
        headerNode={header}
        onScrub={handleScrub}
        onScrubEnd={handleScrubEnd}
        onPeriodChanged={handleOnPeriodChanged}
      />
    );
  });
};
