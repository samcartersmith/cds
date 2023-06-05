import React, { useMemo } from 'react';
import { sparklineInteractiveWithHeaderBuilder } from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';

import { IconButton } from '../../../buttons';
import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { Icon } from '../../../icons';
import { Box, HStack } from '../../../layout';
import { TextTitle3 } from '../../../typography/TextTitle3';
import { SparklineInteractive } from '../../sparkline-interactive/SparklineInteractive';
import { SparklineInteractiveHeader } from '../SparklineInteractiveHeader';

const SparklineInteractiveWithHeaderBuild = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: true,
});

const SparklineInteractiveWithAltHeader = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: true,
  alternatePeriods: true,
});

const SparklineInteractiveWithSmallerPeriodSet = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: true,
  smallerPeriodSet: true,
});

function handlePress() {
  // do nothing
}

const HeaderLabel = () => {
  return (
    <HStack gap={1} alignItems="center" spacingBottom={0}>
      <Icon name="wallet" size="s" />
      <TextTitle3>CustomHeader</TextTitle3>
    </HStack>
  );
};

const SparklineInteractiveHeaderScreen = () => {
  const trailing = useMemo(() => {
    return (
      <HStack gap={1}>
        <IconButton onPress={handlePress} variant="secondary" name="starActive" feedback="heavy" />
        <IconButton onPress={handlePress} variant="secondary" name="share" feedback="heavy" />
      </HStack>
    );
  }, []);

  return (
    <ExampleScreen>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
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
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
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
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            SparklineInteractive Header Custom Label
          </TextTitle3>
          <SparklineInteractiveWithHeaderBuild
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
            labelNode={<HeaderLabel />}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
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
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
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
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            SparklineInteractive Header Example with No Period Set
          </TextTitle3>
          <SparklineInteractiveWithHeaderBuild
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
            hidePeriodSelector
          />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default SparklineInteractiveHeaderScreen;
