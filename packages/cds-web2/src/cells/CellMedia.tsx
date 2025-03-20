import React, { cloneElement, memo } from 'react';
import { imageSize, mediaSize, pictogramScaleMultiplier } from '@cbhq/cds-common2/tokens/cell';
import type {
  CellMediaProps as CellMediaBaseProps,
  SharedAccessibilityProps,
} from '@cbhq/cds-common2/types';

import { Icon } from '../icons/Icon';
import type { PictogramProps } from '../illustrations/Pictogram';
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { RemoteImage } from '../media/RemoteImage';

export type CellMediaProps = CellMediaBaseProps<PictogramProps> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  BoxProps<BoxDefaultElement>;

export const CellMedia = memo(function CellMedia(props: CellMediaProps) {
  let size = mediaSize;
  let content = null;

  if (props.type === 'icon') {
    content = (
      <Icon
        accessibilityLabel={props.accessibilityLabel}
        color={props.color ?? 'fg'}
        name={props.name}
        size="s"
      />
    );
  }

  if (props.type === 'asset' || props.type === 'avatar' || props.type === 'image') {
    const isImage = props.type === 'image';

    if (isImage) {
      size = imageSize;
    }

    content = (
      <Box
        alt={props.accessibilityLabel}
        as={RemoteImage}
        height={size}
        shape={isImage ? 'squircle' : 'circle'}
        source={String(props.source)}
        width={size}
      />
    );
  }

  if (props.type === 'pictogram') {
    size = imageSize;
    content = cloneElement(props.illustration, {
      dimension: '48x48',
      scaleMultiplier: pictogramScaleMultiplier,

      alt: props.accessibilityLabel ?? props.illustration.props.alt,
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
