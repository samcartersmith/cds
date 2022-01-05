import React from 'react';
import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { PriceChart } from './PriceChart';
import { interactiveSparklineData } from './InteractiveSparklineData';
import { usePalette } from '../../../hooks/usePalette';
import { Box } from '../../../layout';
import { TextTitle3 } from '../../../typography/TextTitle3';

const InteractiveSparklineScreen = () => {
  const palette = usePalette();
  return (
    <ExampleScreen>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Default
          </TextTitle3>
          <PriceChart data={interactiveSparklineData} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Compact
          </TextTitle3>
          <PriceChart data={interactiveSparklineData} compact />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Disable Scrubbing
          </TextTitle3>
          <PriceChart data={interactiveSparklineData} disableScrubbing />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Hide period selector
          </TextTitle3>
          <PriceChart data={interactiveSparklineData} hidePeriodSelector />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Hide min/max label
          </TextTitle3>
          <PriceChart data={interactiveSparklineData} hideMinMaxLabel />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Default period All
          </TextTitle3>
          <PriceChart data={interactiveSparklineData} defaultPeriod="all" />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Different color
          </TextTitle3>
          <PriceChart data={interactiveSparklineData} strokeColor={palette.positive} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Fill
          </TextTitle3>
          <PriceChart data={interactiveSparklineData} strokeColor={palette.positive} fill />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Y axis scaling
          </TextTitle3>
          <PriceChart data={interactiveSparklineData} yAxisScalingFactor={0.1} />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default InteractiveSparklineScreen;
