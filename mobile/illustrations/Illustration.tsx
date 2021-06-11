import React, { memo, useMemo } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import {
  IllustrationHeroSquareNames,
  IllustrationSpotRectangleNames,
  IllustrationPictogramNames,
  IllustrationSpotSquareNames,
} from '@cbhq/cds-common/types/Illustration';
import { Image } from 'react-native';
import { SvgCssUri } from 'react-native-svg';

import { IllustrationFilePathMap } from './RelativePathMap';

export interface IllustrationProps extends SharedProps {
  name:
    | IllustrationHeroSquareNames
    | IllustrationSpotRectangleNames
    | IllustrationPictogramNames
    | IllustrationSpotSquareNames;
}

export const Illustration = memo(function Illustration({ name, ...props }: IllustrationProps) {
  const imageMetadata = useMemo(() => IllustrationFilePathMap[name], [name]);

  const image =
    useSpectrumConditional({ light: imageMetadata.light, dark: imageMetadata.dark }) ??
    imageMetadata.light;

  if (imageMetadata.fileFormat === 'svg')
    return <SvgCssUri uri={Image.resolveAssetSource(image).uri} {...props} />;

  return (
    <Image
      source={image ?? imageMetadata.light}
      resizeMode="contain"
      accessibilityIgnoresInvertColors
      {...props}
    />
  );
});
