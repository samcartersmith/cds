import { useEffect, useState } from 'react';
import { debounce } from '@cbhq/cds-common/utils/debounce';

export const TOP_OFFSET = 58;

/**
 * Custom hook to get the dimensions of the window.
 * @returns An object containing the width and height of the window.
 */
export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<{ width: number; height: number }>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handleResize = () => {
    setWindowDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  const debouncedHandleResize = debounce(handleResize, 100);

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [debouncedHandleResize]);

  return windowDimensions;
};
