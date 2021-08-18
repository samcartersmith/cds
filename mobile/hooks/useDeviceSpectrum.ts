import { Appearance, Platform, useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import { Spectrum } from '@cbhq/cds-common';
import { useAppState } from './useAppState';

export const useDeviceSpectrum: () => Spectrum = () => {
  const appState = useAppState();
  const colorSchemeSubscription = useColorScheme();
  const [devicePreference, setDevicePreference] = useState(colorSchemeSubscription);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const colorScheme = Appearance.getColorScheme();
      if (colorSchemeSubscription !== colorScheme) {
        setDevicePreference(colorScheme);
      }
    }
  }, [appState, colorSchemeSubscription]);

  const color = Platform.select({
    default: colorSchemeSubscription,
    ios: colorSchemeSubscription,
    android: devicePreference,
  });

  if (color === 'dark') {
    return 'dark';
  }

  return 'light'; // covers undefined case
};
