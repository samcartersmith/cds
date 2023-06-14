import React, { memo } from 'react';
import { VisualizationContainerBaseProps } from '@cbhq/cds-common/types/VisualizationContainerBaseProps';
import { useVisualizationDimensions } from '@cbhq/cds-common/visualizations/useVisualizationDimensions';

import { useLayout } from '../hooks/useLayout';
import { Box } from '../layout';

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-mobile-sparkline.
 */
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
      <Box onLayout={dimensions.shouldObserve ? onLayout : undefined} width={width} height={height}>
        {dimensions.width && dimensions.height ? children(dimensions) : null}
      </Box>
    );
  },
);
