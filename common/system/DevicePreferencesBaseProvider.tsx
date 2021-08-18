import React, { memo } from 'react';

import type { Scale, Spectrum } from '../index';
import { RootScaleProvider } from '../scale/RootScaleProvider';
import { RootSpectrumProvider } from '../spectrum/RootSpectrumProvider';

export type DevicePreferencesBaseProviderProps = {
  /** Only use if you are passing in a value from a user preference since this will override device scale preference. You are also able to update the root scale imperatively via useRootScaleUpdater. */
  scale?: Scale;
  /** Pass in value from React Native's useColorScheme or some other user preference. You are also able to update the root spectrum imperatively via useRootSpectrumUpdater. */
  spectrum?: Spectrum;
};

/**
 * Render at the root of your app to handle global scale and spectrum preferences.
 * Any children ThemeProviders below this component will override these preferences since all primitives pull from ThemeProvider and not DevicePreferencesProvider.
 * Therefore, CDS consumers should use scale and spectrum ThemeProvider overrides with caution.
 */
export const DevicePreferencesBaseProvider: React.FC<DevicePreferencesBaseProviderProps> = memo(
  ({ children, scale, spectrum }) => {
    return (
      <RootSpectrumProvider value={spectrum}>
        <RootScaleProvider value={scale}>{children}</RootScaleProvider>
      </RootSpectrumProvider>
    );
  },
);
