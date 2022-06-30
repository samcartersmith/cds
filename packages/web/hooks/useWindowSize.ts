import { useEffect, useState } from 'react';

import { getBrowserGlobals } from '../utils/browser';

// Hook
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{
    width: undefined | number;
    height: undefined | number;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const browser = getBrowserGlobals();

    if (browser !== undefined) {
      const { window } = browser;

      // only execute all the code below in client side
      // Handler to call on window resize
      const handleResize = function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }

    return undefined;
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
