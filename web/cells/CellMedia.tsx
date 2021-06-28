import React, { memo } from 'react';

import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { imageSize, mediaSize } from '@cbhq/cds-common/tokens/cell';
import type { CellMediaProps } from '@cbhq/cds-common/types';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { RemoteImage } from '../media/RemoteImage';

export type { CellMediaProps };

export const CellMedia = memo(function CellMedia(props: CellMediaProps) {
  let size = useScaleConditional(mediaSize);
  let content = null;

  if (props.type === 'icon') {
    content = (
      <Icon size="s" name={props.name} color={props.pressable ? 'primary' : 'foreground'} />
    );
  }

  if (props.type === 'asset' || props.type === 'avatar' || props.type === 'image') {
    const isImage = props.type === 'image';

    if (isImage) {
      size = imageSize;
    }

    content = (
      <RemoteImage
        alt={props.title}
        source={props.source}
        shape={isImage ? 'squircle' : 'circle'}
        width={size}
        height={size}
      />
    );
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
