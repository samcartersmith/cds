import React, { memo, useMemo } from 'react';
import type { CardRemoteImageProps } from '@cbhq/cds-common/types';
import { cardRemoteImageProps } from '@cbhq/cds-common/tokens/card';
import { getDefaultAspectRatioForIllustration } from '@cbhq/cds-common/utils/getDefaultAspectRatioForIllustration';

import { RemoteImage, getSource } from '../media/RemoteImage';

export type { CardRemoteImageProps };

export const CardRemoteImage = memo(function CardRemoteImage({ src, size }: CardRemoteImageProps) {
  const aspectRatio = useMemo(() => getDefaultAspectRatioForIllustration(size), [size]);
  const source = useMemo(() => getSource(src), [src]);
  return <RemoteImage {...cardRemoteImageProps} source={source} aspectRatio={aspectRatio} />;
});

CardRemoteImage.displayName = 'CardRemoteImage';
