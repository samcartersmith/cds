import React from 'react';
import { interactiveSparklineBuilder } from '@cbhq/cds-common/internal/interactiveSparklineBuilder';
import { interactiveSparklineData } from '@cbhq/cds-common/internal/visualizations/InteractiveSparklineData';
import { HStack, VStack } from '../../../layout';
import { TextDisplay3, TextHeadline, TextTitle4 } from '../../../typography';
import { InteractiveSparkline } from '../InteractiveSparkline';

export default {
  component: InteractiveSparkline,
  title: 'Core Components/InteractiveSparkline',
};

const InteractiveSparklineBuild = interactiveSparklineBuilder({
  InteractiveSparkline,
});

const strokeColor = '#F7931A';
export const Default = () => (
  <InteractiveSparklineBuild data={interactiveSparklineData} strokeColor={strokeColor} />
);

export const Compact = () => (
  <InteractiveSparklineBuild data={interactiveSparklineData} strokeColor={strokeColor} compact />
);

export const DisableScrubbing = () => (
  <InteractiveSparklineBuild
    data={interactiveSparklineData}
    strokeColor={strokeColor}
    disableScrubbing
  />
);

export const HidePeriodSelector = () => (
  <InteractiveSparklineBuild
    data={interactiveSparklineData}
    strokeColor={strokeColor}
    hidePeriodSelector
  />
);

export const yAxisScaling = () => (
  <InteractiveSparklineBuild
    data={interactiveSparklineData}
    strokeColor={strokeColor}
    yAxisScalingFactor={0.1}
  />
);

export const Fill = () => (
  <InteractiveSparklineBuild data={interactiveSparklineData} strokeColor={strokeColor} fill />
);

export const Fallback = () => <InteractiveSparklineBuild strokeColor={strokeColor} />;

export const NoHoverDate = () => (
  <InteractiveSparklineBuild
    data={interactiveSparklineData}
    strokeColor={strokeColor}
    fill
    hideHoverDate
  />
);

export const WithHeaderNode = () => {
  // TODO replace this with a real chartHeader
  const headerNode = (
    <VStack gap={1}>
      <TextHeadline as="h3">Portfolio Balance</TextHeadline>
      <HStack alignItems="baseline" gap={2}>
        <TextDisplay3 tabularNumbers as="h2">
          $109,811.70
        </TextDisplay3>
        <TextTitle4 as="span" color="positive">
          $91.46 (1.03%)
        </TextTitle4>
      </HStack>
    </VStack>
  );

  return (
    <InteractiveSparklineBuild
      data={interactiveSparklineData}
      strokeColor={strokeColor}
      fill
      headerNode={headerNode}
    />
  );
};
