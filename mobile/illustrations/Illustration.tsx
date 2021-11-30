import React, { memo, useMemo } from 'react';

import { IllustrationBaseProps } from '@cbhq/cds-common/types/IllustrationProps';
import { SvgXml } from 'react-native-svg';

import { useIllustrationXml } from './useIllustrationXml';

export const Illustration = memo(function Illustration({ name, ...props }: IllustrationBaseProps) {
  const xml = useIllustrationXml(name);

  const style = useMemo(
    () => ({
      // Illustrations dont render if values are undefined
      ...(props.width && { width: props.width }),
      ...(props.height && { height: props.height }),
    }),
    [props.width, props.height],
  );

  return <SvgXml style={style} xml={xml} {...props} />;
});
