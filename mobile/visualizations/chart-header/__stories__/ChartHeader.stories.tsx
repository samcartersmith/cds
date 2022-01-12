import React from 'react';
import { interactiveSparklineWithHeaderBuilder } from '@cbhq/cds-common/internal/interactiveSparklineBuilder';
import { interactiveSparklineData } from '@cbhq/cds-common/internal/visualizations/InteractiveSparklineData';
import { InteractiveSparkline } from '../../chart/InteractiveSparkline';
import { ChartHeader } from '../ChartHeader';
import { Box } from '../../../layout';
import { TextTitle3 } from '../../../typography/TextTitle3';
import { Example } from '../../../examples/ExampleScreen';

const InteractiveSparklineWithHeaderBuild = interactiveSparklineWithHeaderBuilder({
  InteractiveSparkline,
  ChartHeader,
});

const ChartHeaderScreen = () => {
  return (
    <Example spacing={0}>
      <Box>
        <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
          Chart Header Example
        </TextTitle3>
        <InteractiveSparklineWithHeaderBuild
          data={interactiveSparklineData}
          strokeColor="#F7931A"
        />
      </Box>
    </Example>
  );
};

export default ChartHeaderScreen;
