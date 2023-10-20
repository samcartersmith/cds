import React from 'react';
import { sparklineInteractiveWithHeaderBuilder } from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';

import { Icon } from '../../../icons';
import { HStack } from '../../../layout';
import { TextTitle3 } from '../../../typography';
import { enableJavascript } from '../../../utils/storybookParams/percy';
import { SparklineInteractive } from '../../sparkline-interactive/SparklineInteractive';
import { SparklineInteractiveHeader } from '../SparklineInteractiveHeader';

export default {
  component: SparklineInteractiveHeader,
  title: 'Core Components/SparklineInteractiveHeader - (deprecate moved to cds-web-visualization)',
};

const HeaderLabel = () => {
  return (
    <HStack alignItems="center" gap={1} spacingBottom={0}>
      <Icon name="wallet" size="s" />
      <TextTitle3 as="span">CustomHeader</TextTitle3>
    </HStack>
  );
};

const SparklineInteractiveWithHeaderBuild = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: false,
});

export const Default = () => {
  return (
    <SparklineInteractiveWithHeaderBuild data={sparklineInteractiveData} strokeColor="#F7931A" />
  );
};
Default.parameters = { percy: enableJavascript };

export const CustomLabel = () => {
  return (
    <SparklineInteractiveWithHeaderBuild
      data={sparklineInteractiveData}
      labelNode={<HeaderLabel />}
      strokeColor="#F7931A"
    />
  );
};
CustomLabel.parameters = { percy: enableJavascript };

export const Compact = () => {
  return (
    <SparklineInteractiveWithHeaderBuild
      compact
      data={sparklineInteractiveData}
      strokeColor="#F7931A"
    />
  );
};

Compact.parameters = { percy: enableJavascript };

export const BottomPeriodSelector = () => {
  return (
    <SparklineInteractiveWithHeaderBuild
      compact
      data={sparklineInteractiveData}
      periodSelectorPlacement="below"
      strokeColor="#F7931A"
    />
  );
};

BottomPeriodSelector.parameters = { percy: enableJavascript };

const SparklineInteractiveWithAltHeader = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: false,
  alternatePeriods: true,
});

export const AlternatePeriods = () => {
  return (
    <SparklineInteractiveWithAltHeader data={sparklineInteractiveData} strokeColor="#F7931A" />
  );
};
AlternatePeriods.parameters = { percy: enableJavascript };
