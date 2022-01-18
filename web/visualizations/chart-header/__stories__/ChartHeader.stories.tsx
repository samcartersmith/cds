import React from 'react';
import { interactiveSparklineWithHeaderBuilder } from '@cbhq/cds-common/internal/interactiveSparklineBuilder';
import { interactiveSparklineData } from '@cbhq/cds-common/internal/visualizations/InteractiveSparklineData';
import { ChartHeader } from '../ChartHeader';
import { InteractiveSparkline } from '../../chart/InteractiveSparkline';

export default {
  component: ChartHeader,
  title: 'Core Components/ChartHeader',
};

const InteractiveSparklineWithHeaderBuild = interactiveSparklineWithHeaderBuilder({
  InteractiveSparkline,
  ChartHeader,
  isMobile: false,
});

export const Default = () => {
  return (
    <InteractiveSparklineWithHeaderBuild data={interactiveSparklineData} strokeColor="#F7931A" />
  );
};
