import React, { memo, ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import { SpacingScale } from '../types';
import { ChartData, ChartDataPoint, ChartFormatAmount, ChartScrubParams } from '../types/Chart';
import { SparklineInteractiveBaseProps } from '../types/SparklineInteractiveBaseProps';
import {
  SparklineInteractiveHeaderProps,
  SparklineInteractiveHeaderRef,
  SparklineInteractiveSubHead,
} from '../types/SparklineInteractiveHeaderBaseProps';

export type SparklinePeriod = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

type SparklineInteractivePriceProps = Omit<
  SparklineInteractiveBaseProps<SparklinePeriod>,
  'periods' | 'defaultPeriod' | 'formatMinMaxLabel' | 'formatDate'
> &
  Partial<Pick<SparklineInteractiveBaseProps<SparklinePeriod>, 'defaultPeriod'>> & {
    hideHoverDate?: boolean;
    hideMinMaxLabel?: boolean;
    trailing?: ReactNode;
    gutter?: SpacingScale;
    disableHorizontalPadding?: boolean;
  };

export const DEFAULT_PERIOD = 'day';

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
const getFormattingConfigForPeriod = (period: SparklinePeriod) => {
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

const getDateHoverOptions = (period: SparklinePeriod) => {
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
    formatMinMaxLabel: ChartFormatAmount;
  };

type SparklineInteractiveBuilderProps = {
  SparklineInteractive: React.ComponentType<
    SparklineInteractiveBuilderComponentProps<SparklinePeriod>
  >;
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
  return memo(({ defaultPeriod, hideHoverDate, ...props }: SparklineInteractivePriceProps) => {
    // not supported onAndroid
    const timezoneObj = useMemo(() => {
      const obj: { timeZone?: string } = {};
      if (!isMobile) {
        obj.timeZone = 'America/New_York';
      }

      return obj;
    }, []);

    const formatDateWithConfig = useCallback(
      (value: Date, period: SparklinePeriod) => {
        const config = getFormattingConfigForPeriod(period);

        return value.toLocaleString('en-US', {
          ...timezoneObj,
          ...config,
        });
      },
      [timezoneObj],
    );

    const formatHoverDate = useCallback(
      (date: Date, period: SparklinePeriod) => {
        return date.toLocaleString('en-US', {
          ...timezoneObj,
          ...getDateHoverOptions(period),
        });
      },
      [timezoneObj],
    );

    const formatMinMaxLabel = useCallback((amount: number | string) => {
      return `$${numToLocaleString(parseInt(amount as string, 10))}`;
    }, []);

    return (
      <SparklineInteractive
        {...props}
        periods={periods}
        formatDate={formatDateWithConfig}
        formatHoverDate={!hideHoverDate ? formatHoverDate : undefined}
        defaultPeriod={defaultPeriod ?? DEFAULT_PERIOD}
        formatMinMaxLabel={formatMinMaxLabel}
      />
    );
  });
};

function generateSubHead(
  point: ChartDataPoint,
  period: SparklinePeriod,
  sparklineInteractiveData: Record<SparklinePeriod, ChartData>,
): SparklineInteractiveSubHead {
  const data = sparklineInteractiveData[period];
  const firstPoint = data[0];

  const increase = point.value > firstPoint.value;
  const subHead: SparklineInteractiveSubHead = {
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
  SparklineInteractiveHeader: React.ForwardRefExoticComponent<
    SparklineInteractiveHeaderProps &
      React.RefAttributes<SparklineInteractiveHeaderRef> & { trailing?: ReactNode }
  >;
};

export const sparklineInteractiveWithHeaderBuilder = ({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile,
}: SparklineInteractiveWithHeaderBuilderProps) => {
  const SparklineInteractiveBuild = sparklineInteractiveBuilder({
    SparklineInteractive,
    isMobile,
  });

  return memo((props: SparklineInteractivePriceProps) => {
    const { data: sparklineData, trailing } = props;
    const sparklineInteractiveData = sparklineData as Record<SparklinePeriod, ChartData>;
    const headerRef = useRef<SparklineInteractiveHeaderRef | null>(null);
    const [currentPeriod, setCurrentPeriod] = useState<SparklinePeriod>(DEFAULT_PERIOD);
    const data = sparklineInteractiveData[currentPeriod];
    const lastPoint = data[data.length - 1];

    const handleScrub = useCallback(
      ({ point, period }: ChartScrubParams<SparklinePeriod>) => {
        headerRef.current?.update({
          title: `$${point.value.toLocaleString('en-US')}`,
          subHead: generateSubHead(point, period, sparklineInteractiveData),
        });
      },
      [sparklineInteractiveData],
    );

    const handleScrubEnd = useCallback(() => {
      headerRef.current?.update({
        title: `$${numToLocaleString(lastPoint.value)}`,
        subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData),
      });
    }, [currentPeriod, sparklineInteractiveData, lastPoint]);

    const handleOnPeriodChanged = useCallback(
      (period: SparklinePeriod) => {
        setCurrentPeriod(period);

        const newData = sparklineInteractiveData[period];
        const newLastPoint = newData[newData.length - 1];

        headerRef.current?.update({
          title: `$${numToLocaleString(newLastPoint.value)}`,
          subHead: generateSubHead(newLastPoint, period, sparklineInteractiveData),
        });
      },
      [sparklineInteractiveData],
    );

    const header = (
      <SparklineInteractiveHeader
        ref={headerRef}
        defaultLabel="Bitcoin Price"
        defaultTitle={`$${numToLocaleString(lastPoint.value)}`}
        defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)}
        trailing={trailing}
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
