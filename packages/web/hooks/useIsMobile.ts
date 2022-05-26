import { useCallback, useEffect, useState } from 'react';

import { breakpoints } from '../layout/responsive';
import { getBrowserGlobals, isSSR } from '../utils/browser';

/** @deprecated Please use useBreakpoints hook instead */
export const useIsMobile = () => {
  const [width, setWidth] = useState<number | undefined>(
    !isSSR() ? getBrowserGlobals()?.window.innerWidth : undefined,
  );

  const handleWindowSizeChange = useCallback(() => {
    setWidth(getBrowserGlobals()?.window.innerWidth);
  }, [setWidth]);
  useEffect(() => {
    // useEffect will only run client side
    getBrowserGlobals()?.window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      getBrowserGlobals()?.window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  return width && width <= breakpoints.phone;
};
