import {
  ChartPeriod,
  DEFAULT_CHART_PERIOD,
  interactiveSparklineBuilder,
} from '@cbhq/cds-common/internal/interactiveSparklineBuilder';
import { ChartDataPoint, ChartScrubParams } from '@cbhq/cds-common';
import { interactiveSparklineData } from '@cbhq/cds-common/internal/visualizations/InteractiveSparklineData';
import { ChartHeaderRef, ChartSubHead } from '@cbhq/cds-common/types/ChartHeaderBaseProps';
import React, { useCallback, useRef, useState } from 'react';
import { InteractiveSparkline } from '../../chart/InteractiveSparkline';
import { ChartHeader } from '../ChartHeader';

const InteractiveSparklineBuild = interactiveSparklineBuilder({
  InteractiveSparkline,
});

function generateSubHead(point: ChartDataPoint, period: ChartPeriod): ChartSubHead {
  const data = interactiveSparklineData[period];
  const firstPoint = data[0];

  const increase = point.value > firstPoint.value;
  const subHead: ChartSubHead = {
    percent: `${(Math.abs((point.value - firstPoint.value) / firstPoint.value) * 100).toFixed(2)}%`,
    sign: increase ? '+' : '–',
    variant: increase ? 'positive' : 'negative',
    priceChange: `$${Math.abs(point.value - firstPoint.value).toLocaleString()}`,
  };

  return subHead;
}

const strokeColor = '#F7931A';
export const InteractiveSparklineWithHeaderExample = () => {
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
      title: `$${lastPoint.value.toLocaleString()}`,
      subHead: generateSubHead(lastPoint, currentPeriod),
    });
  }, [currentPeriod, lastPoint]);

  const header = (
    <ChartHeader
      ref={chartHeaderRef}
      defaultLabel="Portfolio Balance"
      defaultTitle={`$${lastPoint.value.toLocaleString()}`}
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
      onPeriodChanged={setCurrentPeriod}
    />
  );
};
