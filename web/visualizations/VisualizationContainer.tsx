import React, { useLayoutEffect, useRef, useState, ReactNode, memo } from 'react';

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
    const [dimensions, setDimensions] = useState<Dimension | null>(null);
    const boxRef = useRef<HTMLElement>(null);

    const { width: boxWidth, height: boxHeight } = useDimensions({
      ref: boxRef,
      debounceMs: 400,
      shouldSetInitialState: true,
    });

    useLayoutEffect(() => {
      if (boxRef.current) {
        const { offsetWidth, offsetHeight } = boxRef.current;

        setDimensions({
          width: offsetWidth,
          height: offsetHeight,
          circleSize: Math.min(offsetHeight, offsetWidth),
        });
      }
    }, [boxWidth, boxHeight]);

    const childrenWithDimensions = dimensions ? children({ ...dimensions }) : null;

    return (
      <Box ref={boxRef} width={width} height={height}>
        {childrenWithDimensions}
      </Box>
    );
  },
);
