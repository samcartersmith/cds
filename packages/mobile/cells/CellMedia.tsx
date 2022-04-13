import React, { cloneElement, memo } from 'react';
import { ImageURISource } from 'react-native';
import { CellMediaProps as CellMediaBaseProps } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { imageSize, mediaSize } from '@cbhq/cds-common/tokens/cell';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { getSource, RemoteImage } from '../media/RemoteImage';

export type CellMediaProps = CellMediaBaseProps & {
  /**
   * Determines how the requests handles potentially cached responses. Not applicable to type="icon".
   * @link https://reactnative.dev/docs/0.67/images#cache-control-ios-only
   */
  cache?: ImageURISource['cache'];
};

export const CellMedia = memo(function CellMedia(props: CellMediaProps) {
  const mediaSizeScaled = useScaleConditional(mediaSize);
  const imageSizeScaled = useScaleConditional(imageSize);
  let size = mediaSizeScaled;
  let content = null;

  if (props.type === 'icon') {
    content = <Icon size="s" name={props.name} color={props.color ?? 'foreground'} />;
  }

  if (props.type === 'asset' || props.type === 'avatar') {
    content = (
      <RemoteImage
        accessibilityHint={props.title}
        accessibilityLabel={props.title}
        source={getSource(props.source, props.cache)}
        resizeMode="cover"
        shape="circle"
        width={size}
        height={size}
        shouldApplyDarkModeEnhacements
      />
    );
  }

  if (props.type === 'image') {
    size = imageSizeScaled;
    content = (
      <RemoteImage
        accessibilityHint={props.title}
        accessibilityLabel={props.title}
        source={getSource(props.source, props.cache)}
        resizeMode="contain"
        shape="squircle"
        width={size}
        height={size}
      />
    );
  }

  if (props.type === 'pictogram') {
    size = imageSizeScaled;
    content = cloneElement(props.illustration, {
      width: size,
      height: size,
    });
  }

  if (!content) {
    return null;
  }

  return (
    <Box
      width={size}
      height={size}
      alignItems="center"
      justifyContent="center"
      testID={props.testID}
    >
      {content}
    </Box>
  );
});
