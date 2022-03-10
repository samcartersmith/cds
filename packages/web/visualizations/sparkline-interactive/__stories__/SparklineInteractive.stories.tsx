import React from 'react';
import {
  sparklineInteractiveBuilder,
  sparklineInteractiveWithHeaderBuilder,
} from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';

import { SparklineInteractiveHeader } from '../../sparkline-interactive-header/SparklineInteractiveHeader';
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
  SparklineInteractiveHeader,
  isMobile: false,
});

const strokeColor = '#F7931A';
export const Default = () => (
  <React.StrictMode>
    <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} />
  </React.StrictMode>
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
  <React.StrictMode>
    <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} fill />
  </React.StrictMode>
);

export const FallbackPositive = () => <SparklineInteractiveBuild strokeColor={strokeColor} />;
export const FallbackNegative = () => (
  <SparklineInteractiveBuild fallbackType="negative" strokeColor={strokeColor} />
);

export const FallbackCompact = () => (
  <SparklineInteractiveBuild strokeColor={strokeColor} compact />
);

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
