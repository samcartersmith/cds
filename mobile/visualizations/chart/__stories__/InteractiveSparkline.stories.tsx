import React from 'react';
import {
  interactiveSparklineBuilder,
  interactiveSparklineWithHeaderBuilder,
} from '@cbhq/cds-common/internal/interactiveSparklineBuilder';
import { interactiveSparklineData } from '@cbhq/cds-common/internal/visualizations/InteractiveSparklineData';
import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { TextTitle3 } from '../../../typography/TextTitle3';
import { InteractiveSparkline } from '../InteractiveSparkline';
import { Box } from '../../../layout';
import { ChartHeader } from '../../chart-header/ChartHeader';

const InteractiveSparklineBuild = interactiveSparklineBuilder({
  InteractiveSparkline,
});

const InteractiveSparklineWithHeaderBuild = interactiveSparklineWithHeaderBuilder({
  InteractiveSparkline,
  ChartHeader,
});

const strokeColor = '#F7931A';
const InteractiveSparklineScreen = () => {
  return (
    <ExampleScreen>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Default
          </TextTitle3>
          <InteractiveSparklineBuild data={interactiveSparklineData} strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            Compact
          </TextTitle3>
          <InteractiveSparklineBuild
            data={interactiveSparklineData}
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
          <InteractiveSparklineBuild
            data={interactiveSparklineData}
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
          <InteractiveSparklineBuild
            data={interactiveSparklineData}
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
          <InteractiveSparklineBuild
            data={interactiveSparklineData}
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
          <InteractiveSparklineBuild
            data={interactiveSparklineData}
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
          <InteractiveSparklineBuild
            data={interactiveSparklineData}
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
          <InteractiveSparklineBuild
            data={interactiveSparklineData}
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
          <InteractiveSparklineBuild strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            No Hover Date
          </TextTitle3>
          <InteractiveSparklineBuild
            strokeColor={strokeColor}
            data={interactiveSparklineData}
            hideHoverDate
          />
        </Box>
      </Example>
      <Example spacing={0}>
        <Box>
          <TextTitle3 spacingVertical={3} spacingHorizontal={3}>
            With Header Node
          </TextTitle3>
          <InteractiveSparklineWithHeaderBuild
            data={interactiveSparklineData}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default InteractiveSparklineScreen;
