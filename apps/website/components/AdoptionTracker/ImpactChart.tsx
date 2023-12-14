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

function getPercentChange(next: number, prev: number) {
  const rateDifference = next - prev;
  return ((rateDifference / prev) * 100).toFixed(2);
}

function getSubheadProps(prev: number, next: number): SparklineInteractiveSubHead {
  const impactChange = getPercentChange(next, prev);
  const percentIncrease = next > prev;

  return {
    percent: `${impactChange}%`,
    sign: percentIncrease ? 'upwardTrend' : 'downwardTrend',
    variant: percentIncrease ? 'positive' : 'negative',
    priceChange: `${(next - prev).toLocaleString('en-US')}hrs`, // replace with your app's currency formatter
    accessibilityLabel: 'All time',
  };
}

function formatDate(date: Date) {
  return date.toLocaleDateString();
}

export const ImpactChart = ({ chartData }: { chartData: Record<string, ChartData> }) => {
  const [isScrubbing, { toggleOn: handleScrubStart, toggleOff: handleScrubEnd }] =
    useToggler(false);

  const data = chartData.week;
  const headerRef = useRef<SparklineInteractiveHeaderRef>(null); // performant way to handle request updates on scrub

  const { defaultLabel, defaultTitle, defaultSubHead } = useMemo(() => {
    const currentImpact = data[data.length - 1].value;
    const firstImpactInPeriod = data[0].value;
    return {
      defaultLabel: 'Impact Over Time',
      defaultTitle: `${currentImpact.toLocaleString('en-US')} hrs`,
      defaultSubHead: getSubheadProps(firstImpactInPeriod, currentImpact),
    };
  }, [data]);

  const handleScrub = useCallback(
    ({ point }: ChartScrubParams<string>) => {
      const activePoint = point.value;
      const firstImpactInPeriod = data[0].value;

      headerRef.current?.update({
        title: `${activePoint.toLocaleString('en-US')} hrs`,
        subHead: getSubheadProps(firstImpactInPeriod, activePoint),
      });
    },
    [data],
  );

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

ImpactChart.displayName = 'AdoptionChart';
