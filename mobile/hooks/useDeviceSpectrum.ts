import { Appearance, Platform, useColorScheme } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { Spectrum } from '@cbhq/cds-common';
import { useAppState } from './useAppState';

/** Update device preference on app state change for Android. React Native's useColorScheme does not seem to fire on Android on App State change - this fixes that. */
export const useDeviceSpectrum: () => Spectrum = () => {
  const appState = useAppState();
  const colorSchemeSubscription = useColorScheme();
  const [devicePreference, setDevicePreference] = useState(colorSchemeSubscription);

  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    if (isAndroid) {
      const colorScheme = Appearance.getColorScheme();
      setDevicePreference(colorScheme);
    }
  }, [appState, isAndroid]);

  return useMemo(() => {
    if (isAndroid) {
      return devicePreference ?? 'light';
    }

    return colorSchemeSubscription ?? 'light';
  }, [isAndroid, colorSchemeSubscription, devicePreference]);
};
