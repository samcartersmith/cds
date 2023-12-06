/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

type InnerSparklineInteractiveProviderProps = {
  width: number;
  height: number;
  children: React.ReactNode;
};

/**
 * @deprecated this component will be removed from CDS in v6.0.0. It has been moved to cds-web-sparkline.
 */
export const InnerSparklineInteractiveProvider = ({
  width,
  height,
  children,
}: InnerSparklineInteractiveProviderProps) => {
  const { setWidth, setHeight } = useSparklineInteractiveContext();

  useEffect(() => {
    setWidth(width);
    setHeight(height);
  }, [width, height, setWidth, setHeight]);

  return <>{children}</>;
};
