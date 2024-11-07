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
const rgbaStrokeColor = 'rgba(123, 1, 1, 5)';
const rgbStrokeColor = 'rgb(123, 1, 121)';

export const Default = () => (
  <React.StrictMode>
    <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} />
  </React.StrictMode>
);
Default.bind({});
Default.parameters = {
  percy: { enableJavaScript: true },
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
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Contained = () => (
  <React.StrictMode>
    <VStack bordered borderColor="negative">
      <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} />
    </VStack>
  </React.StrictMode>
);

Contained.bind({});
Contained.parameters = {
  percy: { enableJavaScript: true },
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
  percy: { enableJavaScript: true },
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
  percy: { enableJavaScript: true },
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
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const CustomRGBStrokeColor = () => (
  <React.StrictMode>
    <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={rgbStrokeColor} />
  </React.StrictMode>
);

CustomRGBStrokeColor.bind({});
CustomRGBStrokeColor.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const CustomRGBAStrokeColor = () => (
  <React.StrictMode>
    <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={rgbaStrokeColor} />
  </React.StrictMode>
);

CustomRGBAStrokeColor.bind({});
CustomRGBAStrokeColor.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const FillDisabled = () => (
  <React.StrictMode>
    <SparklineInteractiveBuild
      data={sparklineInteractiveData}
      fill={false}
      strokeColor={strokeColor}
    />
  </React.StrictMode>
);
FillDisabled.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const FallbackPositive = () => <SparklineInteractiveBuild strokeColor={strokeColor} />;

FallbackPositive.bind({});
FallbackPositive.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const FallbackNegative = () => (
  <SparklineInteractiveBuild fallbackType="negative" strokeColor={strokeColor} />
);

FallbackNegative.bind({});
FallbackNegative.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const FallbackCompact = () => (
  <SparklineInteractiveBuild compact strokeColor={strokeColor} />
);

FallbackCompact.bind({});
FallbackCompact.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

const formatHoverPrice = (price: number) => {
  return `$${price.toLocaleString('en-US')}`;
};

export const HoverPrice = () => {
  return (
    <SparklineInteractiveBuild
      fill
      data={sparklineInteractiveData}
      formatHoverPrice={formatHoverPrice}
      strokeColor={strokeColor}
    />
  );
};

HoverPrice.bind({});
HoverPrice.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

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
  percy: { enableJavaScript: true },
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
  percy: { enableJavaScript: true },
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
  percy: { enableJavaScript: true },
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
  percy: { enableJavaScript: true },
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
  percy: { enableJavaScript: true },
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
  percy: { enableJavaScript: true },
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
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const NoDataInSelectedPeriod = () => {
  return (
    <React.StrictMode>
      <SparklineInteractiveBuild
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
        data={{ ...sparklineInteractiveData, hour: [] }}
        strokeColor={strokeColor}
      />
    </React.StrictMode>
  );
};
NoDataInSelectedPeriod.bind({});
NoDataInSelectedPeriod.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};
