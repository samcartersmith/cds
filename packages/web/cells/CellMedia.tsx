import React, { cloneElement, memo } from 'react';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { imageSize, mediaSize, pictogramScaleMultiplier } from '@cbhq/cds-common/tokens/cell';
import type {
  CellMediaProps as CellMediaBaseProps,
  SharedAccessibilityProps,
} from '@cbhq/cds-common/types';

import { Icon } from '../icons/Icon';
import { PictogramProps } from '../illustrations';
import { Box } from '../layout/Box';
import { RemoteImage } from '../media/RemoteImage';

export type CellMediaProps = CellMediaBaseProps<PictogramProps> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

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
      />
    );
  }

  if (props.type === 'asset' || props.type === 'avatar' || props.type === 'image') {
    const isImage = props.type === 'image';

    if (isImage) {
      size = imageSizeScaled;
    }

    content = (
      <RemoteImage
        alt={props.accessibilityLabel ?? props.title}
        source={String(props.source)}
        shape={isImage ? 'squircle' : 'circle'}
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
      alt: props.accessibilityLabel ?? props.illustration.props.alt,
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
