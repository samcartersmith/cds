import { useCallback, useEffect, useRef, useState } from 'react';
import { Spectrum } from '@cbhq/cds-common/types';

export const useDeviceSpectrum = () => {
  const mediaQuery = useRef<MediaQueryList>(window.matchMedia('(prefers-color-scheme: dark)'));

  const [deviceSpectrum, setDeviceSpectrum] = useState<Spectrum>(
    mediaQuery.current.matches ? 'dark' : 'light',
  );

  const mediaQueryListEventHandler = useCallback(
    (matches: boolean) => (matches ? setDeviceSpectrum('dark') : setDeviceSpectrum('light')),
    [setDeviceSpectrum],
  );

  useEffect(() => {
    const listener = ({ matches }: { matches: boolean }) => mediaQueryListEventHandler(matches);

    const currentMediaQuery = mediaQuery.current;
    currentMediaQuery.addEventListener('change', listener);

    return () => {
      currentMediaQuery.removeEventListener('change', listener);
    };
  }, [mediaQueryListEventHandler]);

  return deviceSpectrum;
};
