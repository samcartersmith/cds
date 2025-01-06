import React, { cloneElement, memo } from 'react';
import { ImageURISource } from 'react-native';
import { CellMediaProps as CellMediaBaseProps, SharedAccessibilityProps } from '@cbhq/cds-common2';
import { imageSize, mediaSize, pictogramScaleMultiplier } from '@cbhq/cds-common2/tokens/cell';

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
  let size = mediaSize;
  let content = null;

  if (props.type === 'icon') {
    content = (
      <Icon
        accessibilityHint={props.accessibilityHint}
        accessibilityLabel={props.accessibilityLabel}
        color={props.color ?? 'iconForeground'}
        name={props.name}
        size="s"
      />
    );
  }

  if (props.type === 'asset' || props.type === 'avatar') {
    content = (
      <RemoteImage
        darkModeEnhancementsApplied
        accessibilityHint={props.accessibilityHint}
        accessibilityLabel={props.accessibilityLabel ?? props.title}
        height={size}
        resizeMode="cover"
        shape="circle"
        source={getSource(props.source, props.cache)}
        width={size}
      />
    );
  }

  if (props.type === 'image') {
    size = imageSize;
    content = (
      <RemoteImage
        accessibilityHint={props.accessibilityHint}
        accessibilityLabel={props.accessibilityLabel ?? props.title}
        height={size}
        resizeMode="contain"
        shape="squircle"
        source={getSource(props.source, props.cache)}
        width={size}
      />
    );
  }

  if (props.type === 'pictogram') {
    size = imageSize;
    content = cloneElement(props.illustration, {
      dimension: '48x48',
      scaleMultiplier: pictogramScaleMultiplier,
      accessibilityLabel: props.accessibilityLabel ?? props.illustration.props.accessibilityLabel,
      accessibilityHint: props.accessibilityHint ?? props.illustration.props.accessibilityHint,
    });
  }

  if (!content) {
    return null;
  }

  return (
    <Box
      alignItems="center"
      height={size}
      justifyContent="center"
      testID={props.testID}
      width={size}
    >
      {content}
    </Box>
  );
});
