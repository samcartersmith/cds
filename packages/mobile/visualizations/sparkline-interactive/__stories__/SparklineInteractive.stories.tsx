import React from 'react';
import {
  sparklineInteractiveBuilder,
  sparklineInteractiveWithHeaderBuilder,
} from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { Box } from '../../../layout';
import { TextTitle3 } from '../../../typography/TextTitle3';
import { SparklineInteractiveHeader } from '../../sparkline-interactive-header/SparklineInteractiveHeader';
import { SparklineInteractive } from '../SparklineInteractive';

const SparklineInteractiveBuild = sparklineInteractiveBuilder({
  SparklineInteractive,
  isMobile: true,
});

const SparklineInteractiveWithHeaderBuild = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: true,
});

const strokeColor = '#F7931A';
const SparklineInteractiveScreen = () => {
  return (
    <ExampleScreen>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Default
          </TextTitle3>
          <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Compact
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
            compact
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Disable Scrubbing
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
            disableScrubbing
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Hide period selector
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
            hidePeriodSelector
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Hide min/max label
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
            hideMinMaxLabel
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Default period All
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
            defaultPeriod="all"
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Fill
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
            fill
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Y axis scaling
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
            yAxisScalingFactor={0.1}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Fallback
          </TextTitle3>
          <SparklineInteractiveBuild strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Fallback Negative
          </TextTitle3>
          <SparklineInteractiveBuild fallbackType="negative" strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Fallback Compact
          </TextTitle3>
          <SparklineInteractiveBuild strokeColor={strokeColor} compact />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            No Hover Date
          </TextTitle3>
          <SparklineInteractiveBuild
            strokeColor={strokeColor}
            data={sparklineInteractiveData}
            hideHoverDate
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            With Header Node
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
            No Spacing
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
            gutter={0}
          />
        </Box>
      </Example>
      <Example spacing={4}>
        <Box>
          <TextTitle3 spacingVertical={3}>In Container With 4 spacing</TextTitle3>
          <SparklineInteractiveWithHeaderBuild
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
            gutter={4}
            disableHorizontalPadding
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Custom screen spacing 6
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
            gutter={6}
          />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default SparklineInteractiveScreen;
