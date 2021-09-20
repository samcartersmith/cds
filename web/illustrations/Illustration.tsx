import React, { useMemo, memo } from 'react';

import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { IllustrationBaseProps } from '@cbhq/cds-common/types/IllustrationProps';

import { versionNumManifest } from './versionNumManifest';

export const Illustration = memo(function Illustration({
  name,
  width,
  height,
  testID,
  ...props
}: IllustrationBaseProps) {
  const spectrum = useSpectrumConditional({ light: 'light', dark: 'dark' }) ?? 'light';
  const imgPath = useMemo(() => {
    const nameAndSpectrum = `${name}-${spectrum}`;
    if (nameAndSpectrum in versionNumManifest) {
      return `${spectrum}/${name}-${versionNumManifest[nameAndSpectrum]}`;
    }

    // If the spectrum we are looking for does not exist
    // We attempt to use the light mode version. If light mode
    // does not exist, we attempt to use dark mode version
    // If neither exist, we return null for this component
    // The neither case should never happen, but its a safety catch.
    // If neither mode exists, this illustration shouldn't have existed
    // in the first place. It  either malformed in Figma, or something
    // went wrong
    const lightVersionNum = versionNumManifest[`${name}-light`];
    const darkVersionNum = versionNumManifest[`${name}-dark`];

    if (lightVersionNum === undefined && darkVersionNum === undefined) {
      return null;
    }

    if (lightVersionNum !== undefined) {
      return `light/${name}-${lightVersionNum}`;
    }

    return `dark/${name}-${darkVersionNum}`;
  }, [name, spectrum]);

  if (imgPath === null) {
    return null;
  }

  return (
    <img
      src={`https://static-assets.coinbase.com/design-system/illustrations/${imgPath}.svg`}
      alt={name}
      width={width}
      height={height}
      data-testid={testID}
      {...props}
    />
  );
});
