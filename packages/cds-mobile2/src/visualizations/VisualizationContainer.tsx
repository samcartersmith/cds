import React, { memo } from 'react';
import { VisualizationContainerBaseProps } from '@cbhq/cds-common2/types/VisualizationContainerBaseProps';
import { useVisualizationDimensions } from '@cbhq/cds-common2/visualizations/useVisualizationDimensions';

import { useLayout } from '../hooks/useLayout';
import { Box } from '../layout';

/*
Some visualizations need a static width to render. This container can be dynamically sized and it will inject its static calculated dimensions into its child
 */
export const VisualizationContainer: React.FC<VisualizationContainerBaseProps> = memo(
  ({ width, height, children }) => {
    const [{ width: layoutWidth, height: layoutHeight }, onLayout] = useLayout();

    const dimensions = useVisualizationDimensions({
      userDefinedWidth: width,
      userDefinedHeight: height,
      calculatedWidth: layoutWidth,
      calculatedHeight: layoutHeight,
    });

    return (
      <Box height={height} onLayout={dimensions.shouldObserve ? onLayout : undefined} width={width}>
        {dimensions.width && dimensions.height ? children(dimensions) : null}
      </Box>
    );
  },
);
