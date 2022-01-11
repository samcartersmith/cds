import React, { memo, useCallback, useRef, useState } from 'react';
import { ChartDataPoint, ChartFormatAmount, ChartScrubParams } from '../types/Chart';
import { InteractiveSparklineBaseProps } from '../types/InteractiveSparklineBaseProps';
import { ChartHeaderProps, ChartHeaderRef, ChartSubHead } from '../types/ChartHeaderBaseProps';
import { interactiveSparklineData } from './visualizations/InteractiveSparklineData';

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

function numToLocaleString(num: number) {
  return num.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
}

export const interactiveSparklineBuilder = ({
  InteractiveSparkline,
}: InteractiveSparklineBuilderProps) => {
  return memo(({ defaultPeriod, hideHoverDate, ...props }: PriceChartProps) => {
    const formatDateWithConfig = useCallback((value: Date, period: ChartPeriod) => {
      const config = getFormattingConfigForPeriod(period);
      return value.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        ...config,
      });
    }, []);

    const formatHoverDate = useCallback((date: Date, period: ChartPeriod) => {
      return date.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        ...getDateHoverOptions(period),
      });
    }, []);

    const formatAmount = useCallback((amount: number | string) => {
      return `$${numToLocaleString(parseInt(amount as string, 10))}`;
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

function generateSubHead(point: ChartDataPoint, period: ChartPeriod): ChartSubHead {
  const data = interactiveSparklineData[period];
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

type InteractiveSparklineWithHeaderBuilderProps = InteractiveSparklineBuilderProps & {
  ChartHeader: React.ForwardRefExoticComponent<
    ChartHeaderProps & React.RefAttributes<ChartHeaderRef>
  >;
};

export const interactiveSparklineWithHeaderBuilder = ({
  InteractiveSparkline,
  ChartHeader,
}: InteractiveSparklineWithHeaderBuilderProps) => {
  const InteractiveSparklineBuild = interactiveSparklineBuilder({
    InteractiveSparkline,
  });

  const strokeColor = '#F7931A';
  return memo(() => {
    const chartHeaderRef = useRef<ChartHeaderRef | null>(null);
    const [currentPeriod, setCurrentPeriod] = useState<ChartPeriod>(DEFAULT_CHART_PERIOD);
    const data = interactiveSparklineData[currentPeriod];
    const lastPoint = data[data.length - 1];

    const handleScrub = useCallback(({ point, period }: ChartScrubParams<ChartPeriod>) => {
      chartHeaderRef.current?.update({
        title: `$${point.value.toLocaleString()}`,
        subHead: generateSubHead(point, period),
      });
    }, []);

    const handleScrubEnd = useCallback(() => {
      chartHeaderRef.current?.update({
        title: `$${numToLocaleString(lastPoint.value)}`,
        subHead: generateSubHead(lastPoint, currentPeriod),
      });
    }, [currentPeriod, lastPoint]);

    const handleOnPeriodChanged = useCallback((period: ChartPeriod) => {
      setCurrentPeriod(period);

      const newData = interactiveSparklineData[period];
      const newLastPoint = newData[newData.length - 1];

      chartHeaderRef.current?.update({
        title: `$${numToLocaleString(newLastPoint.value)}`,
        subHead: generateSubHead(newLastPoint, period),
      });
    }, []);

    const header = (
      <ChartHeader
        ref={chartHeaderRef}
        defaultLabel="Bitcoin Price"
        defaultTitle={`$${numToLocaleString(lastPoint.value)}`}
        defaultSubHead={generateSubHead(lastPoint, currentPeriod)}
      />
    );

    return (
      <InteractiveSparklineBuild
        strokeColor={strokeColor}
        data={interactiveSparklineData}
        headerNode={header}
        onScrub={handleScrub}
        onScrubEnd={handleScrubEnd}
        onPeriodChanged={handleOnPeriodChanged}
      />
    );
  });
};
