import React, { memo, useMemo } from 'react';
import type { CardRemoteImageProps } from '@cbhq/cds-common/types';
import { getDefaultAspectRatioForIllustration } from '@cbhq/cds-common/utils/getDefaultAspectRatioForIllustration';

import { RemoteImage, getSource } from '../media/RemoteImage';

export type { CardRemoteImageProps };

export const CardRemoteImage = memo(function CardRemoteImage({ src, size }: CardRemoteImageProps) {
  const [width, height] = useMemo(() => getDefaultAspectRatioForIllustration(size), [size]);
  const source = useMemo(() => getSource(src), [src]);
  return <RemoteImage width={width} height={height} source={source} resizeMode="cover" />;
});

CardRemoteImage.displayName = 'CardRemoteImage';
