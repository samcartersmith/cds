import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useToggler } from '@cbhq/cds-common';
import {
  ChartData,
  ChartScrubParams,
  SparklineInteractive,
  SparklineInteractiveHeader,
  SparklineInteractiveHeaderRef,
  SparklineInteractiveSubHead,
} from '@cbhq/cds-web-visualization';

const periods = [{ label: 'Week', value: 'week' }];

function getPercentChange(next: number) {
  const rateDifference = next - 80;
  return ((rateDifference / 80) * 100).toFixed(2);
}

function getSubheadProps(next: number): SparklineInteractiveSubHead {
  const percentChange = getPercentChange(next);
  const percentIncrease = next > 80;

  return {
    percent: `${percentChange}%`,
    sign: percentIncrease ? 'upwardTrend' : 'downwardTrend',
    variant: percentIncrease ? 'positive' : 'negative',
    priceChange: `${(next - 80).toLocaleString('en-US')}%`, // replace with your app's currency formatter
    accessibilityLabel: 'All time',
  };
}

function formatDate(date: Date) {
  return date.toLocaleDateString();
}

export const AdoptionChart = ({ chartData }: { chartData: Record<string, ChartData> }) => {
  const [isScrubbing, { toggleOn: handleScrubStart, toggleOff: handleScrubEnd }] =
    useToggler(false);

  const data = chartData.week;
  const headerRef = useRef<SparklineInteractiveHeaderRef>(null); // performant way to handle request updates on scrub

  const { defaultLabel, defaultTitle, defaultSubHead } = useMemo(() => {
    const currentRate = data[data.length - 1].value * 100;
    const percentage = currentRate.toFixed(2);
    return {
      defaultLabel: 'Adoption Rate Over Time',
      defaultTitle: `${percentage}%`,
      defaultSubHead: getSubheadProps(currentRate),
    };
  }, [data]);

  const handleScrub = useCallback(({ point }: ChartScrubParams<string>) => {
    const activePoint = point.value * 100;
    headerRef.current?.update({
      title: `${activePoint.toFixed(2)}%`,
      subHead: getSubheadProps(activePoint),
    });
  }, []);

  const header = (
    <SparklineInteractiveHeader
      ref={headerRef}
      defaultLabel={defaultLabel}
      defaultSubHead={defaultSubHead}
      defaultTitle={defaultTitle}
    />
  );

  // Update values if changed and not scrubbing
  useEffect(() => {
    if (!isScrubbing) {
      headerRef.current?.update({
        label: defaultLabel,
        title: defaultTitle,
        subHead: defaultSubHead,
      });
    }
  }, [isScrubbing, defaultLabel, defaultTitle, defaultSubHead]);

  return (
    <SparklineInteractive
      compact
      data={chartData}
      defaultPeriod="week"
      formatDate={formatDate}
      formatHoverDate={formatDate}
      headerNode={header}
      onScrub={handleScrub}
      onScrubEnd={handleScrubEnd}
      onScrubStart={handleScrubStart}
      periods={periods}
      strokeColor="#F7931A"
      yAxisScalingFactor={0.8}
    />
  );
};

AdoptionChart.displayName = 'AdoptionChart';
