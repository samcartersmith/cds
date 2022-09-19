import { useCallback, useEffect, useState } from 'react';
import { DeviceBreakpoint, ResponsivePropsDevices } from '@cbhq/cds-common/types';

import { deviceMqRanges } from '../layout/breakpoints';
import { useDefaultBreakpointContext } from '../system/BreakpointsProvider';
import { getBrowserGlobals } from '../utils/browser';
import { addMatchMediaListener, removeMatchMediaListener } from '../utils/globalMatchMediaListener';

type BreakpointRecord = Record<string, boolean>;

const booleanDeviceNames: Record<DeviceBreakpoint, string> = {
  phone: 'isPhone',
  phoneLandscape: 'isPhoneLandscape',
  tablet: 'isTablet',
  tabletLandscape: 'isTabletLandscape',
  desktop: 'isDesktop',
  desktopLarge: 'isDesktopLarge',
  extraWide: 'isExtraWide',
};

export const defaultDeviceMatchesMap: Record<ResponsivePropsDevices, BreakpointRecord> = {
  phone: {
    isPhone: true,
    isPhoneLandscape: false,
    isTablet: false,
    isTabletLandscape: false,
    isDesktop: false,
    isDesktopLarge: false,
    isExtraWide: false,
  },
  tablet: {
    isPhone: false,
    isPhoneLandscape: false,
    isTablet: true,
    isTabletLandscape: false,
    isDesktop: false,
    isDesktopLarge: false,
    isExtraWide: false,
  },
  desktop: {
    isPhone: false,
    isPhoneLandscape: false,
    isTablet: false,
    isTabletLandscape: false,
    isDesktop: true,
    isDesktopLarge: false,
    isExtraWide: false,
  },
};

const deviceKeys = Object.keys(deviceMqRanges) as DeviceBreakpoint[];

/**
 * Only use this hook to conditionally render large component trees or logic
 * @danger do not use this hook to conditionally render styles, please use responsiveConfig instead
 * @returns isPhone, isPhoneLandscape, isTablet, isTabletLandscape, isDesktop, isDesktopLarge, isExtraWide
 */
export const useBreakpoints = (): BreakpointRecord => {
  const defaultDevice = useDefaultBreakpointContext();

  const matchesMediaQuery = useCallback((mediaQuery: string) => {
    return getBrowserGlobals()?.window?.matchMedia(mediaQuery);
  }, []);

  const getMatches = useCallback(() => {
    const matches: BreakpointRecord = {};
    deviceKeys.forEach((device) => {
      const deviceQuery = deviceMqRanges[device];
      matches[booleanDeviceNames[device]] = matchesMediaQuery(deviceQuery)?.matches ?? false;
    });
    return matches;
  }, [matchesMediaQuery]);

  const initialMatches = getMatches();
  const initialState = defaultDevice ? defaultDeviceMatchesMap[defaultDevice] : initialMatches;

  const [deviceMatches, setDeviceMatches] = useState<BreakpointRecord>(initialState);

  const setMatches = useCallback(() => {
    const matches = getMatches();
    setDeviceMatches(matches);
  }, [getMatches]);

  useEffect(() => {
    deviceKeys.forEach((device) => addMatchMediaListener(deviceMqRanges[device], setMatches));
    return () => {
      deviceKeys.forEach((device) => removeMatchMediaListener(deviceMqRanges[device], setMatches));
    };
  }, [getMatches, matchesMediaQuery, setMatches]);

  return deviceMatches;
};
