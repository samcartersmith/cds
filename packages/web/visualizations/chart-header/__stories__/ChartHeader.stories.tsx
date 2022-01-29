import React from 'react';
import { sparklineInteractiveWithHeaderBuilder } from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';

import { SparklineInteractive } from '../../chart/SparklineInteractive';
import { ChartHeader } from '../ChartHeader';

export default {
  component: ChartHeader,
  title: 'Core Components/ChartHeader',
};

const SparklineInteractiveWithHeaderBuild = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  ChartHeader,
  isMobile: false,
});

export const Default = () => {
  return (
    <SparklineInteractiveWithHeaderBuild data={sparklineInteractiveData} strokeColor="#F7931A" />
  );
};
