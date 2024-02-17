import React, { useMemo } from 'react';
import { sparklineInteractiveWithHeaderBuilder } from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { IconButton } from '@cbhq/cds-mobile/buttons';
import { Example, ExampleScreen } from '@cbhq/cds-mobile/examples/ExampleScreen';
import { Icon } from '@cbhq/cds-mobile/icons';
import { Box, HStack } from '@cbhq/cds-mobile/layout';
import { TextTitle3 } from '@cbhq/cds-mobile/typography/TextTitle3';

import { SparklineInteractive } from '../../sparkline-interactive/SparklineInteractive';
import { SparklineInteractiveHeader } from '../SparklineInteractiveHeader';

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
    </ExampleScreen>
  );
};

export default SparklineInteractiveHeaderScreen;
