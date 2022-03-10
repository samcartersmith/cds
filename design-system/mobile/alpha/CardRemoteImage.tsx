import React, { memo, useMemo } from 'react';
import type { CardRemoteImageProps } from '@cbhq/cds-common/types/alpha';

import { RemoteImage, getSource } from '../media/RemoteImage';

export type { CardRemoteImageProps };

export const CardRemoteImage = memo(function CardRemoteImage({
  src,
  ...props
}: CardRemoteImageProps) {
  const source = useMemo(() => getSource(src), [src]);
  return <RemoteImage {...props} source={source} resizeMode="cover" />;
});

CardRemoteImage.displayName = 'CardRemoteImage';
