import React, { cloneElement, memo } from 'react';
import { ImageURISource } from 'react-native';
import { CellMediaProps as CellMediaBaseProps, SharedAccessibilityProps } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { imageSize, mediaSize, pictogramScaleMultiplier } from '@cbhq/cds-common/tokens/cell';

import { Icon } from '../icons/Icon';
import { PictogramProps } from '../illustrations';
import { Box } from '../layout/Box';
import { getSource, RemoteImage } from '../media/RemoteImage';

export type CellMediaProps = {
  /**
   * Determines how the requests handles potentially cached responses. Not applicable to type="icon".
   * @link https://reactnative.dev/docs/0.67/images#cache-control-ios-only
   */
  cache?: ImageURISource['cache'];
} & CellMediaBaseProps<PictogramProps> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>;

export const CellMedia = memo(function CellMedia(props: CellMediaProps) {
  const mediaSizeScaled = useScaleConditional(mediaSize);
  const imageSizeScaled = useScaleConditional(imageSize);
  const pictogramScaleMultiplierScaled = useScaleConditional(pictogramScaleMultiplier);

  let size = mediaSizeScaled;
  let content = null;

  if (props.type === 'icon') {
    content = (
      <Icon
        size="s"
        name={props.name}
        color={props.color ?? 'foreground'}
        accessibilityLabel={props.accessibilityLabel}
        accessibilityHint={props.accessibilityHint}
      />
    );
  }

  if (props.type === 'asset' || props.type === 'avatar') {
    content = (
      <RemoteImage
        accessibilityLabel={props.accessibilityLabel ?? props.title}
        accessibilityHint={props.accessibilityHint}
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
        accessibilityLabel={props.accessibilityLabel ?? props.title}
        accessibilityHint={props.accessibilityHint}
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
      dimension: '48x48',
      scaleMultiplier: pictogramScaleMultiplierScaled,
      accessibilityLabel: props.accessibilityLabel ?? props.illustration.props.accessibilityLabel,
      accessibilityHint: props.accessibilityHint ?? props.illustration.props.accessibilityHint,
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
