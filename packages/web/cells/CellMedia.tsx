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
        accessibilityLabel={props.accessibilityLabel}
        color={props.color ?? 'foreground'}
        name={props.name}
        size="s"
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
        height={size}
        shape={isImage ? 'squircle' : 'circle'}
        source={String(props.source)}
        width={size}
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
