import React from 'react';
import { Box } from '../../../layout';
import { TextTitle3 } from '../../../typography/TextTitle3';
import { InteractiveSparklineWithHeaderExample } from './InteractiveSparklineWithHeaderExample';
import { Example } from '../../../examples/ExampleScreen';

const ChartHeaderScreen = () => {
  return (
    <Example spacing={0}>
      <Box>
        <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
          Chart Header Example
        </TextTitle3>
        <InteractiveSparklineWithHeaderExample />
      </Box>
    </Example>
  );
};

export default ChartHeaderScreen;
