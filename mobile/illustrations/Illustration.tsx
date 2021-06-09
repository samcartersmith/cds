import React, { memo, useMemo } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import {
  IllustrationHeroSquareNames,
  IllustrationSpotRectangleNames,
  IllustrationPictogramNames,
} from '@cbhq/cds-common/types/Illustration';
import { Image } from 'react-native';
import { SvgCssUri } from 'react-native-svg';

import { IllustrationFilePathMap } from './RelativePathMap';

export interface IllustrationProps extends SharedProps {
  name: IllustrationHeroSquareNames | IllustrationSpotRectangleNames | IllustrationPictogramNames;
}

export const Illustration = memo(function Illustration({ name, ...props }: IllustrationProps) {
  const imageMetadata = useMemo(() => IllustrationFilePathMap[name], [name]);

  // Commenting this instead of deleting because when light mode is ready, this should be activated
  // const image = useSpectrumConditional({ light: imageMetadata.light, dark: imageMetadata.dark });
  const image = imageMetadata.light;

  // if (image === null) return null;

  if (imageMetadata.fileFormat === 'svg')
    return <SvgCssUri uri={Image.resolveAssetSource(image).uri} {...props} />;

  return <Image source={image} resizeMode="contain" accessibilityIgnoresInvertColors {...props} />;
});
