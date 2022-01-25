import React, { memo, useMemo } from 'react';
import { SvgXml } from 'react-native-svg';
import { IllustrationVariant } from '@cbhq/cds-common';
import { IllustrationBaseProps } from '@cbhq/cds-common/types/IllustrationProps';
import { convertDimensionToSize } from '@cbhq/cds-common/utils/convertDimensionToSize';
import { convertSizeWithMultiplier } from '@cbhq/cds-common/utils/convertSizeWithMultiplier';
import { getDefaultSizeObjectForIllustration } from '@cbhq/cds-common/utils/getDefaultSizeObjectForIllustration';

import { useIllustrationXml } from './useIllustrationXml';

export function createIllustration<T extends IllustrationVariant>(variant?: T) {
  const defaultSize = getDefaultSizeObjectForIllustration(variant);

  return memo(function Illustration({
    name,
    dimension,
    scaleMultiplier,
    testID,
  }: IllustrationBaseProps<T>) {
    const xml = useIllustrationXml(name);

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

    return <SvgXml style={style} xml={xml} testID={testID} />;
  });
}
