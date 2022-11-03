import React, { memo } from 'react';
import type { CardRemoteImageProps } from '@cbhq/cds-common/types/alpha';

import { RemoteImage } from '../media/RemoteImage';

export type { CardRemoteImageProps };

export const CardRemoteImage = memo(function CardRemoteImage({
  src,
  alt = '',
  ...props
}: CardRemoteImageProps) {
  return <RemoteImage {...props} source={src} resizeMode="cover" alt={alt} />;
});

CardRemoteImage.displayName = 'CardRemoteImage';
