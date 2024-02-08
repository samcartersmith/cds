import React from 'react';
import {
  sparklineInteractiveBuilder,
  sparklineInteractiveWithHeaderBuilder,
} from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import {
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
} from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { Box, VStack } from '@cbhq/cds-web/layout';
import { enableJavascript } from '@cbhq/cds-web/utils/storybookParams/percy';

import { SparklineInteractiveHeader } from '../../sparkline-interactive-header/SparklineInteractiveHeader';
import { SparklineInteractive } from '../SparklineInteractive';

export default {
  component: SparklineInteractive,
  title: 'Visualization/SparklineInteractive',
};

const SparklineInteractiveBuild = sparklineInteractiveBuilder({
  SparklineInteractive,
  isMobile: false,
});

const SparklineInteractiveWithHeaderBuild = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: false,
});

const strokeColor = '#F7931A';

export const Default = () => (
  <React.StrictMode>
    <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} />
  </React.StrictMode>
);

Default.bind({});
Default.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Compact = () => (
  <SparklineInteractiveBuild compact data={sparklineInteractiveData} strokeColor={strokeColor} />
);

Compact.bind({});
Compact.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const DisableScrubbing = () => (
  <SparklineInteractiveBuild
    disableScrubbing
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
  />
);

DisableScrubbing.bind({});
DisableScrubbing.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const HidePeriodSelector = () => (
  <SparklineInteractiveBuild
    hidePeriodSelector
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
  />
);

HidePeriodSelector.bind({});
HidePeriodSelector.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const yAxisScaling = () => (
  <SparklineInteractiveBuild
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
    yAxisScalingFactor={0.1}
  />
);

yAxisScaling.bind({});
yAxisScaling.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Fill = () => (
  <React.StrictMode>
    <SparklineInteractiveBuild fill data={sparklineInteractiveData} strokeColor={strokeColor} />
  </React.StrictMode>
);

Fill.bind({});
Fill.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const FallbackPositive = () => <SparklineInteractiveBuild strokeColor={strokeColor} />;

export const FallbackNegative = () => (
  <SparklineInteractiveBuild fallbackType="negative" strokeColor={strokeColor} />
);

export const FallbackCompact = () => (
  <SparklineInteractiveBuild compact strokeColor={strokeColor} />
);

export const NoHoverDate = () => (
  <SparklineInteractiveBuild
    fill
    hideHoverDate
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
  />
);

NoHoverDate.bind({});
NoHoverDate.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const WithHeaderNode = () => {
  return (
    <SparklineInteractiveWithHeaderBuild data={sparklineInteractiveData} strokeColor="#F7931A" />
  );
};

WithHeaderNode.bind({});
WithHeaderNode.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const TimePeriodGutter = () => {
  return (
    <SparklineInteractiveBuild
      data={sparklineInteractiveData}
      strokeColor={strokeColor}
      timePeriodGutter={3}
    />
  );
};

TimePeriodGutter.bind({});
TimePeriodGutter.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const HoverData = () => {
  return (
    <SparklineInteractiveBuild
      data={sparklineInteractiveData}
      hoverData={sparklineInteractiveHoverData}
      strokeColor={strokeColor}
    />
  );
};

HoverData.bind({});
HoverData.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const HoverDataWithFill = () => {
  return (
    <SparklineInteractiveBuild
      fill
      data={sparklineInteractiveData}
      hoverData={sparklineInteractiveHoverData}
      strokeColor={strokeColor}
    />
  );
};

HoverDataWithFill.bind({});
HoverDataWithFill.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const BottomPeriodSelector = () => {
  return (
    <SparklineInteractiveBuild
      data={sparklineInteractiveData}
      periodSelectorPlacement="below"
      strokeColor={strokeColor}
    />
  );
};

BottomPeriodSelector.bind({});
BottomPeriodSelector.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const VStackedSparkline = () => {
  return (
    <VStack width="100%">
      <Box width="100%">
        <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} />
      </Box>
      <Box background="secondary" height={20} spacingTop={8} width="100%">
        This is an element below the sparkline
      </Box>
    </VStack>
  );
};

VStackedSparkline.bind({});
VStackedSparkline.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};
