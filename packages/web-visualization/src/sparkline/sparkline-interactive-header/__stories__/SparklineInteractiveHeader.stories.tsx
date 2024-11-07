import React, { useCallback, useRef, useState } from 'react';
import {
  type SparklinePeriod,
  generateSubHead,
  numToLocaleString,
  sparklineInteractiveBuilder,
  sparklineInteractiveWithHeaderBuilder,
} from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { ChartScrubParams } from '@cbhq/cds-common/types/Chart';
import { SparklineInteractiveHeaderRef } from '@cbhq/cds-common/types/SparklineInteractiveHeaderBaseProps';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack } from '@cbhq/cds-web/layout';
import { TextTitle3 } from '@cbhq/cds-web/typography';

import { SparklineInteractive } from '../../sparkline-interactive/SparklineInteractive';
import { SparklineInteractiveHeader } from '../SparklineInteractiveHeader';

export default {
  component: SparklineInteractiveHeader,
  title: 'Visualization/SparklineInteractiveHeader',
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

Default.bind({});
Default.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const CustomLabel = () => {
  return (
    <SparklineInteractiveWithHeaderBuild
      data={sparklineInteractiveData}
      labelNode={<HeaderLabel />}
      strokeColor="#F7931A"
    />
  );
};

CustomLabel.bind({});
CustomLabel.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Compact = () => {
  return (
    <SparklineInteractiveWithHeaderBuild
      compact
      data={sparklineInteractiveData}
      strokeColor="#F7931A"
    />
  );
};

Compact.bind({});
Compact.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

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

BottomPeriodSelector.parameters = { percy: { enableJavaScript: true } };

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

AlternatePeriods.bind({});
AlternatePeriods.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const CustomTitle = () => {
  const SparklineInteractiveBuild = sparklineInteractiveBuilder({
    SparklineInteractive,
    isMobile: false,
  });

  const headerRef = useRef<SparklineInteractiveHeaderRef | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<SparklinePeriod>('day');
  const data = sparklineInteractiveData[currentPeriod];
  const lastPoint = data[data.length - 1];
  const titleRef = useRef<HTMLSpanElement>(null);

  const handleScrub = useCallback(({ point, period }: ChartScrubParams<SparklinePeriod>) => {
    headerRef.current?.update({
      subHead: generateSubHead(point, period, sparklineInteractiveData),
    });
    if (titleRef.current) {
      titleRef.current.innerText = `$${point.value.toLocaleString('en-US')}`;
    }
  }, []);

  const handleScrubEnd = useCallback(() => {
    headerRef.current?.update({
      subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData),
    });
    if (titleRef.current) {
      titleRef.current.innerText = `$${numToLocaleString(lastPoint.value)}`;
    }
  }, [currentPeriod, lastPoint]);

  const handleOnPeriodChanged = useCallback((period: SparklinePeriod) => {
    setCurrentPeriod(period);

    const newData = sparklineInteractiveData[period];
    const newLastPoint = newData[newData.length - 1];

    headerRef.current?.update({
      subHead: generateSubHead(newLastPoint, period, sparklineInteractiveData),
    });

    if (titleRef.current) {
      titleRef.current.innerText = `$${numToLocaleString(newLastPoint.value)}`;
    }
  }, []);

  const RenderedDefaultTitle = (
    <TextTitle3 as="div" color="primary">
      <span ref={titleRef}>${numToLocaleString(lastPoint.value)}</span>
    </TextTitle3>
  );

  const header = (
    <SparklineInteractiveHeader
      ref={headerRef}
      defaultLabel="Bitcoin Price"
      defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)}
      defaultTitle={RenderedDefaultTitle}
    />
  );

  return (
    <SparklineInteractiveBuild
      data={sparklineInteractiveData}
      headerNode={header}
      onPeriodChanged={handleOnPeriodChanged}
      onScrub={handleScrub}
      onScrubEnd={handleScrubEnd}
      strokeColor="#F7931A"
    />
  );
};
