import { useEffect, useState } from 'react';

import { breakpoints } from '../layout/responsive';
import { isSSR } from '../utils/browser';

export const useIsMobile = () => {
  const [width, setWidth] = useState<number | undefined>(!isSSR() ? window.innerWidth : undefined);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    // useEffect will only run client side
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return width && width <= breakpoints.phone;
};
