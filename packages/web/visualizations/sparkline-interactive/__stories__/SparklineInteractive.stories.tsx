import React from 'react';
import {
  sparklineInteractiveBuilder,
  sparklineInteractiveWithHeaderBuilder,
} from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import {
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
} from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';

import { enableJavascript } from '../../../utils/storybookParams/percy';
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
Default.parameters = { percy: enableJavascript };

export const Compact = () => (
  <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} compact />
);
Compact.parameters = { percy: enableJavascript };

export const DisableScrubbing = () => (
  <SparklineInteractiveBuild
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
    disableScrubbing
  />
);
DisableScrubbing.parameters = { percy: enableJavascript };

export const HidePeriodSelector = () => (
  <SparklineInteractiveBuild
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
    hidePeriodSelector
  />
);
HidePeriodSelector.parameters = { percy: enableJavascript };

export const yAxisScaling = () => (
  <SparklineInteractiveBuild
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
    yAxisScalingFactor={0.1}
  />
);
yAxisScaling.parameters = { percy: enableJavascript };

export const Fill = () => (
  <React.StrictMode>
    <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} fill />
  </React.StrictMode>
);
Fill.parameters = { percy: enableJavascript };

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
NoHoverDate.parameters = { percy: enableJavascript };

export const WithHeaderNode = () => {
  return (
    <SparklineInteractiveWithHeaderBuild data={sparklineInteractiveData} strokeColor="#F7931A" />
  );
};
WithHeaderNode.parameters = { percy: enableJavascript };

export const TimePeriodGutter = () => {
  return (
    <SparklineInteractiveBuild
      data={sparklineInteractiveData}
      strokeColor={strokeColor}
      timePeriodGutter={3}
    />
  );
};
TimePeriodGutter.parameters = { percy: enableJavascript };

export const HoverData = () => {
  return (
    <SparklineInteractiveBuild
      data={sparklineInteractiveData}
      strokeColor={strokeColor}
      hoverData={sparklineInteractiveHoverData}
    />
  );
};
HoverData.parameters = { percy: enableJavascript };

export const HoverDataWithFill = () => {
  return (
    <SparklineInteractiveBuild
      data={sparklineInteractiveData}
      strokeColor={strokeColor}
      hoverData={sparklineInteractiveHoverData}
      fill
    />
  );
};
HoverDataWithFill.parameters = { percy: enableJavascript };

export const BottomPeriodSelector = () => {
  return (
    <SparklineInteractiveBuild
      data={sparklineInteractiveData}
      strokeColor={strokeColor}
      periodSelectorPlacement="below"
    />
  );
};

BottomPeriodSelector.parameters = { percy: enableJavascript };
