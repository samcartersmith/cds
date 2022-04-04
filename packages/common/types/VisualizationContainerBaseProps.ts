import { ReactNode } from 'react';

import type { DimensionValue } from './DimensionStyles';

export type VisualizationContainerBaseProps = {
  width: DimensionValue;
  height: DimensionValue;
  minHeight?: DimensionValue; // can be used when a width calculation is only necessary
  children: (dimensions: VisualizationContainerDimension) => ReactNode;
};

export type VisualizationContainerDimension = {
  width: number;
  height: number;
  circleSize: number;
};
