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
    timePeriodGutter?: SpacingScale;
    labelNode?: ReactNode;
    allowOverflowGestures?: boolean;
  };

export const DEFAULT_PERIOD = 'day';
const DATE_TIME_OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
} as const;

const periodsAlt = [
  {
    label: '1 Std.',
    value: 'hour' as const,
  },
  {
    label: '1 Tag',
    value: 'day' as const,
  },
  {
    label: '1 Wo.',
    value: 'week' as const,
  },
  {
    label: '1 Mon.',
    value: 'month' as const,
  },
  {
    label: '1 Jahr',
    value: 'year' as const,
  },
  {
    label: 'All',
    value: 'all' as const,
  },
];

const subsetOfPeriods = [
  {
    label: '1D',
    value: 'day' as const,
  },
  {
    label: '1M',
    value: 'month' as const,
  },
  {
    label: '1Y',
    value: 'year' as const,
  },
];

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
    React.PropsWithChildren<SparklineInteractiveBuilderComponentProps<SparklinePeriod>>
  >;
  isMobile?: boolean;
  alternatePeriods?: boolean;
  smallerPeriodSet?: boolean;
  disableScrubbing?: boolean;
};

export function numToLocaleString(num: number) {
  return num.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });
}

export const sparklineInteractiveBuilder = ({
  SparklineInteractive,
  isMobile,
  alternatePeriods,
  smallerPeriodSet,
  disableScrubbing,
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

    const configurablePeriods = useMemo(() => {
      if (alternatePeriods) {
        return periodsAlt;
      }

      if (smallerPeriodSet) {
        return subsetOfPeriods;
      }

      return periods;
    }, []);

    return (
      <SparklineInteractive
        disableScrubbing={disableScrubbing}
        {...props}
        defaultPeriod={defaultPeriod ?? DEFAULT_PERIOD}
        formatDate={formatDateWithConfig}
        formatHoverDate={!hideHoverDate ? formatHoverDate : undefined}
        formatMinMaxLabel={formatMinMaxLabel}
        periods={configurablePeriods}
      />
    );
  });
};

export function generateSubHead(
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
    sign: increase ? 'upwardTrend' : 'downwardTrend',
    variant: increase ? 'positive' : 'negative',
    // NOTE: Ensure this string is localized in your product implementation
    accessibilityLabel: `on ${new Intl.DateTimeFormat('en-US', DATE_TIME_OPTIONS).format(
      point?.date,
    )}, ${increase ? 'up' : 'down'}`,
    priceChange: `$${numToLocaleString(Math.abs(point.value - firstPoint.value))}`,
  };

  return subHead;
}

type SparklineInteractiveWithHeaderBuilderProps = SparklineInteractiveBuilderProps & {
  SparklineInteractiveHeader: React.ForwardRefExoticComponent<
    SparklineInteractiveHeaderProps &
      React.RefAttributes<SparklineInteractiveHeaderRef> & {
        trailing?: ReactNode;
        labelNode?: ReactNode;
      }
  >;
};

export const sparklineInteractiveWithHeaderBuilder = ({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile,
  alternatePeriods,
  smallerPeriodSet,
  disableScrubbing,
}: SparklineInteractiveWithHeaderBuilderProps) => {
  const SparklineInteractiveBuild = sparklineInteractiveBuilder({
    SparklineInteractive,
    isMobile,
    alternatePeriods,
    smallerPeriodSet,
    disableScrubbing,
  });

  return memo((props: SparklineInteractivePriceProps) => {
    const { data: sparklineData, trailing, labelNode, compact } = props;
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
        compact={compact}
        defaultLabel={labelNode ? 'CustomHeader' : 'Bitcoin Price'}
        defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)}
        defaultTitle={`$${numToLocaleString(lastPoint.value)}`}
        labelNode={labelNode}
        trailing={trailing}
      />
    );

    return (
      <SparklineInteractiveBuild
        {...props}
        headerNode={header}
        onPeriodChanged={handleOnPeriodChanged}
        onScrub={handleScrub}
        onScrubEnd={handleScrubEnd}
      />
    );
  });
};
