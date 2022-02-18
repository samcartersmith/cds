import React, { memo, useMemo } from 'react';
import type { CardRemoteImageProps } from '@cbhq/cds-common/types';
import { getDefaultAspectRatioForIllustration } from '@cbhq/cds-common/utils/getDefaultAspectRatioForIllustration';

import { RemoteImage } from '../media/RemoteImage';

export type { CardRemoteImageProps };

export const CardRemoteImage = memo(function CardRemoteImage({ src, size }: CardRemoteImageProps) {
  const [width, height] = useMemo(() => getDefaultAspectRatioForIllustration(size), [size]);
  return <RemoteImage source={src} width={width} height={height} />;
});

CardRemoteImage.displayName = 'CardRemoteImage';
