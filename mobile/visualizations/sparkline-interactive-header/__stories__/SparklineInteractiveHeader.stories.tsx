import React from 'react';
import { sparklineInteractiveWithHeaderBuilder } from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { SparklineInteractive } from '../../sparkline-interactive/SparklineInteractive';
import { SparklineInteractiveHeader } from '../SparklineInteractiveHeader';
import { Box } from '../../../layout';
import { TextTitle3 } from '../../../typography/TextTitle3';
import { Example } from '../../../examples/ExampleScreen';

const SparklineInteractiveWithHeaderBuild = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: true,
});

const SparklineInteractiveHeaderScreen = () => {
  return (
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
  );
};

export default SparklineInteractiveHeaderScreen;
