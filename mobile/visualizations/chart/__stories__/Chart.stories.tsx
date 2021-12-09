import React from 'react';
import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { PriceChart } from './PriceChart';
import { assetData } from './AssetData';
import { usePalette } from '../../../hooks/usePalette';
import { Box } from '../../../layout';
import { TextTitle3 } from '../../../typography/TextTitle3';

const ChartScreen = () => {
  const palette = usePalette();
  return (
    <ExampleScreen>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Default
          </TextTitle3>
          <PriceChart data={assetData} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Compact
          </TextTitle3>
          <PriceChart data={assetData} compact />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Disable Scrubbing
          </TextTitle3>
          <PriceChart data={assetData} disableScrubbing />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Hide period selector
          </TextTitle3>
          <PriceChart data={assetData} hidePeriodSelector />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Hide min/max label
          </TextTitle3>
          <PriceChart data={assetData} hideMinMaxLabel />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Default period All
          </TextTitle3>
          <PriceChart data={assetData} defaultPeriod="all" />
        </Box>
      </Example>
      <Example title="Different color" spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Different color
          </TextTitle3>
          <PriceChart data={assetData} strokeColor={palette.positive} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Large gutter
          </TextTitle3>
          <PriceChart data={assetData} strokeColor={palette.positive} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            No gutter
          </TextTitle3>
          <PriceChart data={assetData} strokeColor={palette.positive} />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default ChartScreen;
