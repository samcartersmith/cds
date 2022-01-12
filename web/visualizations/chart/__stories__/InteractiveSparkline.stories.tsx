import React from 'react';
import {
  interactiveSparklineBuilder,
  interactiveSparklineWithHeaderBuilder,
} from '@cbhq/cds-common/internal/interactiveSparklineBuilder';
import { interactiveSparklineData } from '@cbhq/cds-common/internal/visualizations/InteractiveSparklineData';
import { InteractiveSparkline } from '../InteractiveSparkline';
import { ChartHeader } from '../../chart-header/ChartHeader';

export default {
  component: InteractiveSparkline,
  title: 'Core Components/InteractiveSparkline',
};

const InteractiveSparklineBuild = interactiveSparklineBuilder({
  InteractiveSparkline,
});

const InteractiveSparklineWithHeaderBuild = interactiveSparklineWithHeaderBuilder({
  InteractiveSparkline,
  ChartHeader,
});

const strokeColor = '#F7931A';
export const Default = () => (
  <InteractiveSparklineBuild data={interactiveSparklineData} strokeColor={strokeColor} />
);

export const Compact = () => (
  <InteractiveSparklineBuild data={interactiveSparklineData} strokeColor={strokeColor} compact />
);

export const DisableScrubbing = () => (
  <InteractiveSparklineBuild
    data={interactiveSparklineData}
    strokeColor={strokeColor}
    disableScrubbing
  />
);

export const HidePeriodSelector = () => (
  <InteractiveSparklineBuild
    data={interactiveSparklineData}
    strokeColor={strokeColor}
    hidePeriodSelector
  />
);

export const yAxisScaling = () => (
  <InteractiveSparklineBuild
    data={interactiveSparklineData}
    strokeColor={strokeColor}
    yAxisScalingFactor={0.1}
  />
);

export const Fill = () => (
  <InteractiveSparklineBuild data={interactiveSparklineData} strokeColor={strokeColor} fill />
);

export const Fallback = () => <InteractiveSparklineBuild strokeColor={strokeColor} />;

export const NoHoverDate = () => (
  <InteractiveSparklineBuild
    data={interactiveSparklineData}
    strokeColor={strokeColor}
    fill
    hideHoverDate
  />
);

export const WithHeaderNode = () => {
  return (
    <InteractiveSparklineWithHeaderBuild data={interactiveSparklineData} strokeColor="#F7931A" />
  );
};
