import { useEffect, useRef } from 'react';
import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { useRootSpectrumUpdater } from '@cbhq/cds-common/spectrum/useRootSpectrumUpdater';
import { Spectrum } from '@cbhq/cds-common';
import { useDeviceSpectrum } from '../hooks/useDeviceSpectrum';

function usePrevious(value: Spectrum) {
  const ref = useRef<Spectrum>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const useRootSpectrumSyncManager = () => {
  const deviceSpectrum = useDeviceSpectrum();
  const rootSpectrum = useRootSpectrum();
  const updateRootSpectrum = useRootSpectrumUpdater();

  const prevDeviceSpectrum = usePrevious(deviceSpectrum);

  useEffect(() => {
    if (deviceSpectrum !== prevDeviceSpectrum && deviceSpectrum !== rootSpectrum) {
      updateRootSpectrum(deviceSpectrum);
    }
  }, [deviceSpectrum, prevDeviceSpectrum, rootSpectrum, updateRootSpectrum]);
};

export const RootSpectrumSyncManager = () => {
  useRootSpectrumSyncManager();
  return null;
};
