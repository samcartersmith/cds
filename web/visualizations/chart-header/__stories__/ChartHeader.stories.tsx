import React from 'react';
import { interactiveSparklineWithHeaderBuilder } from '@cbhq/cds-common/internal/interactiveSparklineBuilder';
import { ChartHeader } from '../ChartHeader';
import { InteractiveSparkline } from '../../chart/InteractiveSparkline';

export default {
  component: ChartHeader,
  title: 'Core Components/ChartHeader',
};

const InteractiveSparklineWithHeaderBuild = interactiveSparklineWithHeaderBuilder({
  InteractiveSparkline,
  ChartHeader,
});

export const Default = () => {
  return <InteractiveSparklineWithHeaderBuild />;
};
