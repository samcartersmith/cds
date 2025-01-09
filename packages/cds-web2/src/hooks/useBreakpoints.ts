import { useCallback, useContext, useEffect, useState } from 'react';

import { type DeviceBreakpoint, media } from '../styles/media';
import { MediaQueryContext } from '../system/MediaQueryProvider';
import { getBrowserGlobals } from '../utils/browser';

export type DeviceBreakpointValues =
  | 'isPhone'
  | 'isPhonePortrait'
  | 'isPhoneLandscape'
  | 'isTablet'
  | 'isTabletPortrait'
  | 'isTabletLandscape'
  | 'isDesktop'
  | 'isDesktopSmall'
  | 'isDesktopLarge'
  | 'isExtraWide';

type BreakpointRecord = Partial<Record<DeviceBreakpointValues, boolean>>;
const booleanDeviceNames: Record<DeviceBreakpoint, DeviceBreakpointValues> = {
  phone: 'isPhone',
  phonePortrait: 'isPhonePortrait',
  phoneLandscape: 'isPhoneLandscape',
  tablet: 'isTablet',
  tabletPortrait: 'isTabletPortrait',
  tabletLandscape: 'isTabletLandscape',
  desktop: 'isDesktop',
  desktopSmall: 'isDesktopSmall',
  desktopLarge: 'isDesktopLarge',
  extraWide: 'isExtraWide',
};

const deviceKeys = Object.keys(media) as DeviceBreakpoint[];

/**
 * Only use this hook to conditionally render large component trees or logic
 * @returns isPhone, isPhoneLandscape, isTablet, isTabletLandscape, isDesktop, isDesktopLarge, isExtraWide
 */
export const useBreakpoints = (): BreakpointRecord => {
  const mediaQueryContext = useContext(MediaQueryContext);
  if (!mediaQueryContext)
    throw new Error('useBreakpoints must be used within a MediaQueryProvider');
  const { subscribe, getSnapshot } = mediaQueryContext;
  const matchesMediaQuery = useCallback((mediaQuery: string) => {
    return getBrowserGlobals()?.window?.matchMedia(mediaQuery);
  }, []);

  const getMatches = useCallback(() => {
    const matches: BreakpointRecord = {};
    deviceKeys.forEach((device) => {
      const deviceQuery = media[device];
      matches[booleanDeviceNames[device]] = matchesMediaQuery(deviceQuery)?.matches ?? false;
    });
    return matches;
  }, [matchesMediaQuery]);

  const getInitialMatches = useCallback(() => {
    const matches: BreakpointRecord = {};
    deviceKeys.forEach((device) => {
      const deviceQuery = media[device];
      matches[booleanDeviceNames[device]] = getSnapshot(deviceQuery) ?? false;
    });
    return matches;
  }, [getSnapshot]);

  const initialState = getInitialMatches();

  const [deviceMatches, setDeviceMatches] = useState<BreakpointRecord>(initialState);

  const setMatches = useCallback(() => {
    const matches = getMatches();
    setDeviceMatches(matches);
  }, [getMatches]);

  useEffect(() => {
    deviceKeys.forEach((device) => subscribe(media[device], setMatches));
  }, [subscribe, setMatches]);
  return deviceMatches;
};
