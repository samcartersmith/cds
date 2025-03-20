import React, { useCallback, useMemo, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import {
  generateSubHead,
  numToLocaleString,
  sparklineInteractiveBuilder,
  sparklineInteractiveWithHeaderBuilder,
  type SparklinePeriod,
} from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { ChartScrubParams } from '@cbhq/cds-common/types/Chart';
import { SparklineInteractiveHeaderRef } from '@cbhq/cds-common/types/SparklineInteractiveHeaderBaseProps';
import { IconButton } from '@cbhq/cds-mobile/buttons';
import { Example, ExampleScreen } from '@cbhq/cds-mobile/examples/ExampleScreen';
import { fontScaleProps } from '@cbhq/cds-mobile/hooks/useDeviceScaleToCdsScale';
import { Icon } from '@cbhq/cds-mobile/icons';
import { Box, HStack } from '@cbhq/cds-mobile/layout';
import { TextTitle3 } from '@cbhq/cds-mobile/typography/TextTitle3';

import { SparklineInteractive } from '../../sparkline-interactive/SparklineInteractive';
import { SparklineInteractiveHeader } from '../SparklineInteractiveHeader';
import { useSparklineInteractiveHeaderStyles } from '../useSparklineInteractiveHeaderStyles';

const SparklineInteractiveWithHeaderBuild = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: true,
  disableScrubbing: !__DEV__,
});

const SparklineInteractiveWithAltHeader = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: true,
  alternatePeriods: true,
  disableScrubbing: !__DEV__,
});

const SparklineInteractiveWithSmallerPeriodSet = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: true,
  smallerPeriodSet: true,
  disableScrubbing: !__DEV__,
});

function handlePress() {
  // do nothing
}

const HeaderLabel = () => {
  return (
    <HStack alignItems="center" gap={1} spacingBottom={0}>
      <Icon name="wallet" size="s" />
      <TextTitle3>CustomHeader</TextTitle3>
    </HStack>
  );
};

export const SparklineInteractiveHeaderWithCustomTitle = () => {
  const SparklineInteractiveBuild = sparklineInteractiveBuilder({
    SparklineInteractive,
    isMobile: true,
    disableScrubbing: !__DEV__,
  });

  const headerRef = useRef<SparklineInteractiveHeaderRef | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<SparklinePeriod>('day');
  const data = sparklineInteractiveData[currentPeriod];
  const lastPoint = data[data.length - 1];
  const titleRef = useRef<TextInput>(null);
  const styles = useSparklineInteractiveHeaderStyles();

  const handleScrub = useCallback(
    ({ point, period }: ChartScrubParams<SparklinePeriod>) => {
      const newTitle = `$${point.value.toLocaleString('en-US')}`;
      headerRef.current?.update({
        subHead: generateSubHead(point, period, sparklineInteractiveData),
      });
      titleRef.current?.setNativeProps({
        text: newTitle,
        style: [styles.title(newTitle), { color: 'green' }],
      });
    },
    [styles],
  );

  const handleScrubEnd = useCallback(() => {
    const newTitle = `$${numToLocaleString(lastPoint.value)}`;
    headerRef.current?.update({
      subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData),
    });
    titleRef.current?.setNativeProps({
      text: newTitle,
      style: [styles.title(newTitle), { color: 'green' }],
    });
  }, [currentPeriod, lastPoint, styles]);

  const handleOnPeriodChanged = useCallback(
    (period: SparklinePeriod) => {
      setCurrentPeriod(period);

      const newData = sparklineInteractiveData[period];
      const newLastPoint = newData[newData.length - 1];
      const newTitle = `$${numToLocaleString(newLastPoint.value)}`;

      headerRef.current?.update({
        subHead: generateSubHead(newLastPoint, period, sparklineInteractiveData),
      });
      titleRef.current?.setNativeProps({
        text: newTitle,
        style: [styles.title(newTitle), { color: 'green' }],
      });
    },
    [styles],
  );

  const defaultTitleStyle = useMemo(
    () => [styles.title(`$${numToLocaleString(lastPoint.value)}`), { color: 'green' }],
    [lastPoint.value, styles],
  );

  const RenderedDefaultTitle = (
    <TextInput
      ref={titleRef}
      defaultValue={`$${numToLocaleString(lastPoint.value)}`}
      editable={false}
      pointerEvents="none"
      style={defaultTitleStyle}
      testID="SparklineInteractiveHeaderTitle"
      {...fontScaleProps}
    />
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

const SparklineInteractiveHeaderScreen = () => {
  const trailing = useMemo(() => {
    return (
      <HStack gap={1}>
        <IconButton feedback="heavy" name="starActive" onPress={handlePress} variant="secondary" />
        <IconButton feedback="heavy" name="share" onPress={handlePress} variant="secondary" />
      </HStack>
    );
  }, []);

  return (
    <ExampleScreen>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            SparklineInteractive Header Example
          </TextTitle3>
          <SparklineInteractiveWithHeaderBuild
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            SparklineInteractive Header Trailing
          </TextTitle3>
          <SparklineInteractiveWithHeaderBuild
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
            trailing={trailing}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            SparklineInteractive Header Custom Label
          </TextTitle3>
          <SparklineInteractiveWithHeaderBuild
            data={sparklineInteractiveData}
            labelNode={<HeaderLabel />}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            SparklineInteractive Header Example with AltHeader
          </TextTitle3>
          <SparklineInteractiveWithAltHeader
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            SparklineInteractive Header Example with Smaller Period Set
          </TextTitle3>
          <SparklineInteractiveWithSmallerPeriodSet
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            SparklineInteractive Header Example with No Period Set
          </TextTitle3>
          <SparklineInteractiveWithHeaderBuild
            hidePeriodSelector
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            SparklineInteractive Header Custom Title
          </TextTitle3>
          <SparklineInteractiveHeaderWithCustomTitle />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default SparklineInteractiveHeaderScreen;
