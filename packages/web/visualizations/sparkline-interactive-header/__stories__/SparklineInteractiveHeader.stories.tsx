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
  title: 'Core Components/SparklineInteractiveHeader',
};

const HeaderLabel = () => {
  return (
    <HStack gap={1} alignItems="center" spacingBottom={0}>
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
      strokeColor="#F7931A"
      labelNode={<HeaderLabel />}
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
      data={sparklineInteractiveData}
      compact
      strokeColor="#F7931A"
      periodSelectorPlacement="below"
    />
  );
};

BottomPeriodSelector.parameters = { percy: enableJavascript };
