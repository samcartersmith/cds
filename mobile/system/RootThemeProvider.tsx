import React, { memo } from 'react';

import type { Scale, Spectrum } from '@cbhq/cds-common';
import { RootScaleProvider } from '@cbhq/cds-common/scale/RootScaleProvider';
import { RootSpectrumProvider } from '@cbhq/cds-common/spectrum/RootSpectrumProvider';

import { RootScaleSyncManager } from './RootScaleSyncManager';

export type RootThemeProviderProps = {
  /** Only use if you are passing in a value from an in-app user preference since this will override device scale preference. You are also able to update the root scale imperatively via useRootScaleUpdater. */
  scale?: Scale;
  /** Pass in value from React Native's useColorScheme or some user preference. You are also able to update the root spectrum imperatively via useRootSpectrumUpdater. */
  spectrum?: Spectrum;
};

/**
 * Render at the root of your app to handle global scale and spectrum preferences.
 * Any children ThemeProviders below this component will override these preferences since all primitives pull from ThemeProvider and not RootThemeProvider.
 * Therefore, CDS consumers should use scale and spectrum ThemeProvider overrides with caution.
 */
export const RootThemeProvider: React.FC<RootThemeProviderProps> = memo(
  ({ children, scale, spectrum }) => {
    return (
      <RootSpectrumProvider value={spectrum}>
        <RootScaleProvider value={scale}>
          {!scale && <RootScaleSyncManager />}
          {children}
        </RootScaleProvider>
      </RootSpectrumProvider>
    );
  },
);

RootThemeProvider.displayName = 'RootThemeProvider';
