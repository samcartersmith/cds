import { useEffect } from 'react';

import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { useRootScaleUpdater } from '@cbhq/cds-common/scale/useRootScaleUpdater';

import { useDeviceScaleToCdsScale } from '../hooks/useDeviceScaleToCdsScale';

export const useRootScaleSyncManager = () => {
  const deviceScale = useDeviceScaleToCdsScale();
  const rootScale = useRootScale();
  const updateRootScale = useRootScaleUpdater();

  useEffect(() => {
    if (rootScale !== deviceScale) {
      updateRootScale(deviceScale);
    }
  }, [deviceScale, rootScale, updateRootScale]);
};

/** This is required to guarantee changes to device font scale are updated in the RootScale context. */
export const RootScaleSyncManager = () => {
  useRootScaleSyncManager();
  return null;
};
