import React from 'react';
import {
  sparklineInteractiveBuilder,
  sparklineInteractiveWithHeaderBuilder,
} from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import {
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
} from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { enableJavascript } from '@cbhq/cds-web/utils/storybookParams/percy';

import { SparklineInteractiveHeader } from '../../sparkline-interactive-header/SparklineInteractiveHeader';
import { SparklineInteractive } from '../SparklineInteractive';

export default {
  component: SparklineInteractive,
  title: 'Visualization/SparklineInteractive',
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
  <SparklineInteractiveBuild compact data={sparklineInteractiveData} strokeColor={strokeColor} />
);
Compact.parameters = { percy: enableJavascript };

export const DisableScrubbing = () => (
  <SparklineInteractiveBuild
    disableScrubbing
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
  />
);
DisableScrubbing.parameters = { percy: enableJavascript };

export const HidePeriodSelector = () => (
  <SparklineInteractiveBuild
    hidePeriodSelector
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
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
    <SparklineInteractiveBuild fill data={sparklineInteractiveData} strokeColor={strokeColor} />
  </React.StrictMode>
);
Fill.parameters = { percy: enableJavascript };

export const FallbackPositive = () => <SparklineInteractiveBuild strokeColor={strokeColor} />;

export const FallbackNegative = () => (
  <SparklineInteractiveBuild fallbackType="negative" strokeColor={strokeColor} />
);

export const FallbackCompact = () => (
  <SparklineInteractiveBuild compact strokeColor={strokeColor} />
);

export const NoHoverDate = () => (
  <SparklineInteractiveBuild
    fill
    hideHoverDate
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
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
      hoverData={sparklineInteractiveHoverData}
      strokeColor={strokeColor}
    />
  );
};
HoverData.parameters = { percy: enableJavascript };

export const HoverDataWithFill = () => {
  return (
    <SparklineInteractiveBuild
      fill
      data={sparklineInteractiveData}
      hoverData={sparklineInteractiveHoverData}
      strokeColor={strokeColor}
    />
  );
};
HoverDataWithFill.parameters = { percy: enableJavascript };

export const BottomPeriodSelector = () => {
  return (
    <SparklineInteractiveBuild
      data={sparklineInteractiveData}
      periodSelectorPlacement="below"
      strokeColor={strokeColor}
    />
  );
};

BottomPeriodSelector.parameters = { percy: enableJavascript };
