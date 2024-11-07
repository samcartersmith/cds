import { useMemo } from 'react';
import { Spectrum } from '@cbhq/cds-common';
import {
  remoteImageDarkFallbackSrc,
  remoteImageLightFallbackSrc,
} from '@cbhq/cds-common/media/remoteImageFallbackSrc';

export function useRemoteImageSrc(spectrum: Spectrum, src?: string) {
  return useMemo(() => {
    const remoteImageFallbackSrc =
      spectrum === 'dark' ? remoteImageDarkFallbackSrc : remoteImageLightFallbackSrc;
    return src ?? remoteImageFallbackSrc;
  }, [spectrum, src]);
}
