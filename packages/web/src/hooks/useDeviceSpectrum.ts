import { useCallback, useEffect, useRef, useState } from 'react';
import { Spectrum } from '@cbhq/cds-common/types';

import { getBrowserGlobals } from '../utils/browser';
import { addMediaQueryListener, removeMediaQueryListener } from '../utils/mediaQueryListener';

export const useDeviceSpectrum = () => {
  const window = getBrowserGlobals()?.window;
  const mediaQuery = useRef<MediaQueryList | undefined>(
    window?.matchMedia('(prefers-color-scheme: dark)'),
  );

  const [deviceSpectrum, setDeviceSpectrum] = useState<Spectrum>(
    mediaQuery.current?.matches ? 'dark' : 'light',
  );

  const mediaQueryListEventHandler = useCallback(
    (matches: boolean) => (matches ? setDeviceSpectrum('dark') : setDeviceSpectrum('light')),
    [setDeviceSpectrum],
  );

  useEffect(() => {
    const listener = ({ matches }: { matches: boolean }) => mediaQueryListEventHandler(matches);

    const currentMediaQuery = mediaQuery.current;
    addMediaQueryListener(currentMediaQuery, listener);

    return () => {
      removeMediaQueryListener(currentMediaQuery, listener);
    };
  }, [mediaQueryListEventHandler]);

  return deviceSpectrum;
};
