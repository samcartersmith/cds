import React, { ReactNode, memo } from 'react';

import { DimensionValue } from '@cbhq/cds-common';
import { Box } from '../layout';
import { useDimensions } from '../hooks/useDimensions';

export type VisualizationContainerProps = {
  width: DimensionValue;
  height: DimensionValue;
  children: ({ width, height }: Dimension) => ReactNode;
};

export type Dimension = {
  width: number;
  height: number;
  circleSize: number;
};

/*
Some visualizations need a static width to render. This container can be dynamically sized and it will inject its static calculated dimensions into its child
 */
export const VisualizationContainer: React.FC<VisualizationContainerProps> = memo(
  ({ width, height, children }) => {
    const { observe, width: boxWidth, height: boxHeight } = useDimensions();
    const dimensions = {
      width: boxWidth,
      height: boxHeight,
      circleSize: Math.min(boxHeight, boxWidth),
    };

    return (
      <Box ref={observe} width={width} height={height}>
        {dimensions ? children(dimensions) : null}
      </Box>
    );
  },
);
