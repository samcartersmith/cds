import { ReactNode } from 'react';
import { DimensionValue } from '.';

export type VisualizationContainerBaseProps = {
  width: DimensionValue;
  height: DimensionValue;
  children: (dimensions: VisualizationContainerDimension) => ReactNode;
};

export type VisualizationContainerDimension = {
  width: number;
  height: number;
  circleSize: number;
};
