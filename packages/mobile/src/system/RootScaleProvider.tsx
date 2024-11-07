import React, { memo } from 'react';
import { RootScaleContext } from '@cbhq/cds-common/scale/context';
import {
  RootScalePreferenceProvider,
  RootScalePreferenceProviderProps,
} from '@cbhq/cds-common/scale/RootScalePreferenceProvider';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { useRootScalePreference } from '@cbhq/cds-common/scale/useRootScalePreference';

import { useDeviceScaleToCdsScale } from '../hooks/useDeviceScaleToCdsScale';

const LocalScaleProvider = ({ children }: { children: React.ReactNode }) => {
  const rootScale = useRootScalePreference();
  const deviceScale = useDeviceScaleToCdsScale();
  const scale = rootScale === 'system' ? deviceScale : rootScale;
  return (
    <RootScaleContext.Provider value={scale}>
      <ScaleProvider value={scale}>{children}</ScaleProvider>
    </RootScaleContext.Provider>
  );
};

export const RootScaleProvider: React.FC<
  React.PropsWithChildren<RootScalePreferenceProviderProps>
> = memo(({ children, value }) => {
  return (
    <RootScalePreferenceProvider value={value}>
      <LocalScaleProvider>{children}</LocalScaleProvider>
    </RootScalePreferenceProvider>
  );
});

RootScaleProvider.displayName = 'RootScaleProvider';
