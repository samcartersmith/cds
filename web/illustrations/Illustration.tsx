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
  const versionNum = useMemo(() => versionNumManifest[`${name}-${spectrum}`], [spectrum, name]);

  return (
    <img
      src={`https://static-assets.coinbase.com/design-system/illustrations/${spectrum}/${name}-${versionNum}.svg`}
      alt={name}
      width={width}
      height={height}
      {...props}
    />
  );
});
