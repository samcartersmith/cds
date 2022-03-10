import React, { memo } from 'react';
import { DEFAULT_SCALE, RootScaleContext } from '@cbhq/cds-common/scale/context';
import {
  RootScalePreferenceProvider,
  RootScalePreferenceProviderProps,
} from '@cbhq/cds-common/scale/RootScalePreferenceProvider';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { useRootScalePreference } from '@cbhq/cds-common/scale/useRootScalePreference';

const LocalScaleProvider = ({ children }: { children: React.ReactNode }) => {
  const rootScale = useRootScalePreference();
  const scale = rootScale === 'system' ? DEFAULT_SCALE : rootScale;
  return (
    <RootScaleContext.Provider value={scale}>
      <ScaleProvider value={scale}>{children}</ScaleProvider>
    </RootScaleContext.Provider>
  );
};

export const RootScaleProvider: React.FC<RootScalePreferenceProviderProps> = memo(
  ({ children, value }) => {
    return (
      <RootScalePreferenceProvider value={value}>
        <LocalScaleProvider>{children}</LocalScaleProvider>
      </RootScalePreferenceProvider>
    );
  },
);
