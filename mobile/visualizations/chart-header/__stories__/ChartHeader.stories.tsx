import React from 'react';
import { sparklineInteractiveWithHeaderBuilder } from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { SparklineInteractive } from '../../chart/SparklineInteractive';
import { ChartHeader } from '../ChartHeader';
import { Box } from '../../../layout';
import { TextTitle3 } from '../../../typography/TextTitle3';
import { Example } from '../../../examples/ExampleScreen';

const SparklineInteractiveWithHeaderBuild = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  ChartHeader,
  isMobile: true,
});

const ChartHeaderScreen = () => {
  return (
    <Example spacing={0}>
      <Box>
        <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
          Chart Header Example
        </TextTitle3>
        <SparklineInteractiveWithHeaderBuild
          data={sparklineInteractiveData}
          strokeColor="#F7931A"
        />
      </Box>
    </Example>
  );
};

export default ChartHeaderScreen;
