import React, { memo } from 'react';

import { VisualizationContainerBaseProps } from '@cbhq/cds-common/types/VisualizationContainerBaseProps';
import { useVisualizationDimensions } from '@cbhq/cds-common/visualizations/useVisualizationDimensions';
import { Box } from '../layout';
import { useDimensions } from '../hooks/useDimensions';

/*
Some visualizations need a static width to render. This container can be dynamically sized and it will inject its static calculated dimensions into its child
 */
export const VisualizationContainer: React.FC<VisualizationContainerBaseProps> = memo(
  ({ width, height, children }) => {
    const { observe, width: boxWidth, height: boxHeight } = useDimensions();
    const dimensions = useVisualizationDimensions({
      userDefinedWidth: width,
      userDefinedHeight: height,
      calculatedWidth: boxWidth,
      calculatedHeight: boxHeight,
    });

    return (
      <Box ref={dimensions.shouldObserve ? observe : undefined} width={width} height={height}>
        {dimensions.width && dimensions.height ? children(dimensions) : null}
      </Box>
    );
  },
);
