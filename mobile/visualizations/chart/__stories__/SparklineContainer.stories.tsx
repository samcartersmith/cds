import React from 'react';
import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { PriceChart } from './PriceChart';
import { sparklineContainerData } from './SparklineContainerData';
import { usePalette } from '../../../hooks/usePalette';
import { Box } from '../../../layout';
import { TextTitle3 } from '../../../typography/TextTitle3';

const SparklineContainerScreen = () => {
  const palette = usePalette();
  return (
    <ExampleScreen>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Default
          </TextTitle3>
          <PriceChart data={sparklineContainerData} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Compact
          </TextTitle3>
          <PriceChart data={sparklineContainerData} compact />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Disable Scrubbing
          </TextTitle3>
          <PriceChart data={sparklineContainerData} disableScrubbing />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Hide period selector
          </TextTitle3>
          <PriceChart data={sparklineContainerData} hidePeriodSelector />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Hide min/max label
          </TextTitle3>
          <PriceChart data={sparklineContainerData} hideMinMaxLabel />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Default period All
          </TextTitle3>
          <PriceChart data={sparklineContainerData} defaultPeriod="all" />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Different color
          </TextTitle3>
          <PriceChart data={sparklineContainerData} strokeColor={palette.positive} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Fill
          </TextTitle3>
          <PriceChart data={sparklineContainerData} strokeColor={palette.positive} fill />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default SparklineContainerScreen;
