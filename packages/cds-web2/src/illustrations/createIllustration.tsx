import React, { memo, useMemo } from 'react';
import type { IllustrationVariant } from '@cbhq/cds-common2/types/IllustrationNames';
import {
  IllustrationBaseProps,
  IllustrationNamesMap,
} from '@cbhq/cds-common2/types/IllustrationProps';
import { convertDimensionToSize } from '@cbhq/cds-common2/utils/convertDimensionToSize';
import { convertSizeWithMultiplier } from '@cbhq/cds-common2/utils/convertSizeWithMultiplier';
import { getDefaultSizeObjectForIllustration } from '@cbhq/cds-common2/utils/getDefaultSizeObjectForIllustration';
import { isDevelopment } from '@cbhq/cds-utils';

import { useColorScheme } from '../hooks/useColorScheme';

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
    const colorScheme = useColorScheme();
    const version = config[name];

    const src = `https://static-assets.coinbase.com/ui-infra/illustration/v1/${variant}/svg/${colorScheme}/${name}-${version}.svg`;

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
        // eslint-disable-next-line no-console
        console.error(`Unable to find illustration with name: ${name}`);
      }
      return fallback;
    }

    return <img alt={alt} data-testid={testID} height={height} src={src} width={width} />;
  });

  Illustration.displayName = 'Illustration';
  return Illustration;
}
