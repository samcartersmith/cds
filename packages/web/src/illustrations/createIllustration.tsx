import React, { memo, useMemo } from 'react';
import { IllustrationVariant, useSpectrum } from '@cbhq/cds-common';
import {
  IllustrationBaseProps,
  IllustrationNamesMap,
} from '@cbhq/cds-common/types/IllustrationProps';
import { convertDimensionToSize } from '@cbhq/cds-common/utils/convertDimensionToSize';
import { convertSizeWithMultiplier } from '@cbhq/cds-common/utils/convertSizeWithMultiplier';
import { getDefaultSizeObjectForIllustration } from '@cbhq/cds-common/utils/getDefaultSizeObjectForIllustration';
import { isDevelopment } from '@cbhq/cds-utils';

type IllustrationConfigShape<Variant extends IllustrationVariant> = Record<
  IllustrationNamesMap[Variant],
  number
>;

export type IllustrationA11yProps = {
  /** Alt tag to apply to the img
   * @default "" will identify the image as decorative
   */
  alt?: string;
};

export type IllustrationBasePropsWithA11y<Type extends IllustrationVariant> =
  IllustrationBaseProps<Type> & IllustrationA11yProps;

export function createIllustration<Variant extends IllustrationVariant>(
  variant: Variant,
  config: IllustrationConfigShape<Variant>,
) {
  const defaultSize = getDefaultSizeObjectForIllustration(variant);

  type IllustrationProps = IllustrationBasePropsWithA11y<Variant>;

  const Illustration = memo(function Illustration({
    name,
    dimension,
    scaleMultiplier,
    testID,
    alt = '',
    fallback = null,
  }: IllustrationProps) {
    const spectrum = useSpectrum();
    const version = config[name];

    const src = `https://static-assets.coinbase.com/ui-infra/illustration/v1/${variant}/svg/${spectrum}/${name}-${version}.svg`;

    const { width, height } = useMemo(() => {
      let size = defaultSize;
      if (dimension) {
        size = convertDimensionToSize(dimension);
      }
      if (scaleMultiplier) {
        size = convertSizeWithMultiplier(size, scaleMultiplier);
      }
      return size;
    }, [dimension, scaleMultiplier]);

    if (version === undefined) {
      if (isDevelopment()) {
        console.error(`Unable to find illustration with name: ${name}`);
      }
      return fallback;
    }

    return <img alt={alt} data-testid={testID} height={height} src={src} width={width} />;
  });

  Illustration.displayName = 'Illustration';
  return Illustration;
}
