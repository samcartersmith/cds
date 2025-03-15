import React from 'react';
import {
  sparklineInteractiveBuilder,
  sparklineInteractiveWithHeaderBuilder,
} from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import {
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
  strokeColor,
} from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { Example, ExampleScreen } from '@cbhq/cds-mobile/examples/ExampleScreen';
import { Box } from '@cbhq/cds-mobile/layout';
import { TextTitle3 } from '@cbhq/cds-mobile/typography/TextTitle3';

import { SparklineInteractiveHeader } from '../../sparkline-interactive-header/SparklineInteractiveHeader';
import { SparklineInteractive } from '../SparklineInteractive';

const SparklineInteractiveBuild = sparklineInteractiveBuilder({
  SparklineInteractive,
  isMobile: true,
  disableScrubbing: !__DEV__,
});

const SparklineInteractiveWithHeaderBuild = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: true,
  disableScrubbing: !__DEV__,
});

const rgbaStrokeColor = 'rgba(123, 1, 1, 5)';
const rgbStrokeColor = 'rgb(123, 1, 121)';

const SparklineInteractiveScreen = () => {
  return (
    <ExampleScreen>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Default
          </TextTitle3>
          <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Compact
          </TextTitle3>
          <SparklineInteractiveBuild
            compact
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Disable Scrubbing
          </TextTitle3>
          <SparklineInteractiveBuild
            disableScrubbing
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Hide period selector
          </TextTitle3>
          <SparklineInteractiveBuild
            hidePeriodSelector
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Hide min/max label
          </TextTitle3>
          <SparklineInteractiveBuild
            hideMinMaxLabel
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Default period All
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            defaultPeriod="all"
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Fill Disabled
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            fill={false}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
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
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Fallback
          </TextTitle3>
          <SparklineInteractiveBuild strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Fallback Negative
          </TextTitle3>
          <SparklineInteractiveBuild fallbackType="negative" strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Fallback Compact
          </TextTitle3>
          <SparklineInteractiveBuild compact strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            No Hover Date
          </TextTitle3>
          <SparklineInteractiveBuild
            hideHoverDate
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
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
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            No Spacing
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            gutter={0}
            strokeColor="#F7931A"
            timePeriodGutter={3}
          />
        </Box>
      </Example>
      <Example spacing={4}>
        <Box>
          <TextTitle3 spacingVertical={3}>In Container With 4 spacing</TextTitle3>
          <SparklineInteractiveWithHeaderBuild
            disableHorizontalPadding
            data={sparklineInteractiveData}
            gutter={4}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Custom screen spacing 6
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            gutter={6}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Hover data
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            hoverData={sparklineInteractiveHoverData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Custom RGB Stoke Color
          </TextTitle3>
          <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={rgbStrokeColor} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Custom RGBA Stoke Color
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor={rgbaStrokeColor}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            No Data In SelectedPeriod
          </TextTitle3>
          <SparklineInteractiveBuild
            data={{ ...sparklineInteractiveData, hour: [] }}
            strokeColor={rgbaStrokeColor}
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingHorizontal={3} spacingVertical={3}>
            Enable Interaction When Outside
          </TextTitle3>
          <SparklineInteractiveBuild
            allowOverflowGestures
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default SparklineInteractiveScreen;
