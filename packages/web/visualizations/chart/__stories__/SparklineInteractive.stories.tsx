import React from 'react';
import {
  sparklineInteractiveBuilder,
  sparklineInteractiveWithHeaderBuilder,
} from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';

import { ChartHeader } from '../../chart-header/ChartHeader';
import { SparklineInteractive } from '../SparklineInteractive';

export default {
  component: SparklineInteractive,
  title: 'Core Components/SparklineInteractive',
};

const SparklineInteractiveBuild = sparklineInteractiveBuilder({
  SparklineInteractive,
  isMobile: false,
});

const SparklineInteractiveWithHeaderBuild = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  ChartHeader,
  isMobile: false,
});

const strokeColor = '#F7931A';
export const Default = () => (
  <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} />
);

export const Compact = () => (
  <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} compact />
);

export const DisableScrubbing = () => (
  <SparklineInteractiveBuild
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
    disableScrubbing
  />
);

export const HidePeriodSelector = () => (
  <SparklineInteractiveBuild
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
    hidePeriodSelector
  />
);

export const yAxisScaling = () => (
  <SparklineInteractiveBuild
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
    yAxisScalingFactor={0.1}
  />
);

export const Fill = () => (
  <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} fill />
);

export const Fallback = () => <SparklineInteractiveBuild strokeColor={strokeColor} />;

export const NoHoverDate = () => (
  <SparklineInteractiveBuild
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
    fill
    hideHoverDate
  />
);

export const WithHeaderNode = () => {
  return (
    <SparklineInteractiveWithHeaderBuild data={sparklineInteractiveData} strokeColor="#F7931A" />
  );
};
