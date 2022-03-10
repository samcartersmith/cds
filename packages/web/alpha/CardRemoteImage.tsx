import React, { memo } from 'react';
import type { CardRemoteImageProps } from '@cbhq/cds-common/types/alpha';

import { RemoteImage } from '../media/RemoteImage';

export type { CardRemoteImageProps };

export const CardRemoteImage = memo(function CardRemoteImage({
  src,
  ...props
}: CardRemoteImageProps) {
  return <RemoteImage {...props} source={src} resizeMode="cover" />;
});

CardRemoteImage.displayName = 'CardRemoteImage';
