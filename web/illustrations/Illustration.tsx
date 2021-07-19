import React, { useMemo, memo } from 'react';

import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { IllustrationBaseProps } from '@cbhq/cds-common/types/IllustrationProps';

import { versionNumManifest } from './versionNumManifest';

export const Illustration = memo(function Illustration({
  name,
  width,
  height,
  ...props
}: IllustrationBaseProps) {
  const spectrum = useSpectrumConditional({ light: 'light', dark: 'dark' }) ?? 'light';
  const imgPath = useMemo(() => {
    const nameAndSpectrum = `${name}-${spectrum}`;
    if (nameAndSpectrum in versionNumManifest) {
      return `${spectrum}/${name}-${versionNumManifest[nameAndSpectrum]}`;
    }
    return `light/${name}-${versionNumManifest[`${name}-light`]}`;
  }, [name, spectrum]);

  return (
    <img
      src={`https://static-assets.coinbase.com/design-system/illustrations/${imgPath}.svg`}
      alt={name}
      width={width}
      height={height}
      {...props}
    />
  );
});
