import React, { memo, useMemo } from 'react';

import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { IllustrationBaseProps } from '@cbhq/cds-common/types/IllustrationProps';
import { Image } from 'react-native';
import { SvgCssUri } from 'react-native-svg';

import { IllustrationFilePathMap } from './RelativePathMap';

export const Illustration = memo(function Illustration({
  name,
  testID,
  ...props
}: IllustrationBaseProps) {
  const imageMetadata = useMemo(() => IllustrationFilePathMap[name], [name]);

  const image = (useSpectrumConditional({ light: imageMetadata.light, dark: imageMetadata.dark }) ??
    imageMetadata.light) as number;

  const style = useMemo(
    () => ({
      // Illustrations dont render if values are undefined
      ...(props.width && { width: props.width }),
      ...(props.height && { height: props.height }),
    }),
    [props.width, props.height],
  );

  if (image === null) {
    return null;
  }

  if (imageMetadata.fileFormat === 'svg') {
    return <SvgCssUri style={style} uri={Image.resolveAssetSource(image).uri} {...props} />;
  }

  return (
    <Image
      style={style}
      source={image ?? imageMetadata.light}
      resizeMode="contain"
      accessibilityIgnoresInvertColors
      data-testid={testID}
      {...props}
    />
  );
});
