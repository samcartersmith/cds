import { useCallback, useEffect, useState } from 'react';

import { DeviceBreakpoint, deviceMqRanges } from '../layout/responsive';
import { getBrowserGlobals } from '../utils/browser';

type BreakpointRecord = Record<string, boolean>;

const booleanDeviceNames: Record<DeviceBreakpoint, string> = {
  phone: 'isPhone',
  phoneLarge: 'isPhoneLarge',
  tablet: 'isTablet',
  tabletLandscape: 'isTabletLandscape',
  desktop: 'isDesktop',
  desktopLarge: 'isDesktopLarge',
  extraWide: 'isExtraWide',
};

const deviceKeys = Object.keys(deviceMqRanges) as DeviceBreakpoint[];

/**
 * @deprecated This component is unreleased and is inherently unstable
 * Please use useIsMobile instead
 */
export const useBreakpoints = (): BreakpointRecord => {
  const window = getBrowserGlobals()?.window;

  const matchesMediaQuery = useCallback(
    (mediaQuery: string) => {
      return window?.matchMedia(mediaQuery);
    },
    [window],
  );

  const getMatches = useCallback(() => {
    const matches: BreakpointRecord = {};
    deviceKeys.forEach((device) => {
      const deviceQuery = deviceMqRanges[device];
      matches[booleanDeviceNames[device]] = matchesMediaQuery(deviceQuery)?.matches ?? false;
    });
    return matches;
  }, [matchesMediaQuery]);

  const [deviceMatches, setDeviceMatches] = useState<BreakpointRecord>(getMatches());

  const setMatches = useCallback(() => {
    const matches = getMatches();
    setDeviceMatches(matches);
  }, [getMatches]);

  useEffect(() => {
    deviceKeys.forEach((device) => {
      const deviceQuery = deviceMqRanges[device];
      matchesMediaQuery(deviceQuery)?.addEventListener('change', setMatches);
    });
    return () => {
      deviceKeys.forEach((device) => {
        const deviceQuery = deviceMqRanges[device];
        matchesMediaQuery(deviceQuery)?.removeEventListener('change', setMatches);
      });
    };
  }, [getMatches, matchesMediaQuery, setMatches]);

  return deviceMatches;
};
