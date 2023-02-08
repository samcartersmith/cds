import React, { memo, useMemo } from 'react';
import { SvgXml } from 'react-native-svg';
import { IllustrationVariant, useSpectrum } from '@cbhq/cds-common';
import { IllustrationBaseProps } from '@cbhq/cds-common/types/IllustrationProps';
import { convertDimensionToSize } from '@cbhq/cds-common/utils/convertDimensionToSize';
import { convertSizeWithMultiplier } from '@cbhq/cds-common/utils/convertSizeWithMultiplier';
import { getDefaultSizeObjectForIllustration } from '@cbhq/cds-common/utils/getDefaultSizeObjectForIllustration';
import { isDevelopment } from '@cbhq/cds-utils';

type IllustrationConfigShape = Record<string, { light: () => string; dark: () => string }>;

export function createIllustration<
  Variant extends IllustrationVariant,
  Config extends IllustrationConfigShape,
>(variant: Variant, config: Config): React.ComponentType<IllustrationBaseProps<Variant>> {
  const defaultSize = getDefaultSizeObjectForIllustration(variant);

  type IllustrationProps = IllustrationBaseProps<Variant>;

  const Illustration = memo(function Illustration({
    fallback = null,
    name,
    dimension,
    scaleMultiplier,
    testID,
  }: IllustrationProps) {
    const spectrum = useSpectrum();
    const requireFn = config[name]?.[spectrum];

    const xml = useMemo(() => requireFn?.(), [requireFn]);

    const style = useMemo(() => {
      let size = defaultSize;
      if (dimension) {
        size = convertDimensionToSize(dimension);
      }
      if (scaleMultiplier) {
        size = convertSizeWithMultiplier(size, scaleMultiplier);
      }
      return size;
    }, [dimension, scaleMultiplier]);

    if (!xml) {
      if (isDevelopment()) {
        // eslint-disable-next-line no-console
        console.error(`Unable to find illustration with name: ${name}`);
      }
      return fallback;
    }

    return <SvgXml style={style} xml={xml} testID={testID} />;
  });

  Illustration.displayName = `Illustration`;
  return Illustration;
}
