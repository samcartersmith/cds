import React, { useEffect } from 'react';

import { useChartContext } from './ChartProvider';

type InnerChartProviderProps = {
  width: number;
  height: number;
  children: React.ReactNode;
};

export const InnerChartProvider = ({ width, height, children }: InnerChartProviderProps) => {
  const { setWidth, setHeight } = useChartContext();

  useEffect(() => {
    setWidth(width);
    setHeight(height);
  }, [width, height, setWidth, setHeight]);

  return children as React.ReactElement;
};
