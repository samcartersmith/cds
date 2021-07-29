import React, { cloneElement, memo } from 'react';

import { CellMediaProps } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { imageSize, mediaSize } from '@cbhq/cds-common/tokens/cell';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { RemoteImage, getSource } from '../media/RemoteImage';

export type { CellMediaProps };

export const CellMedia = memo(function CellMedia(props: CellMediaProps) {
  const mediaSizeScaled = useScaleConditional(mediaSize);
  const imageSizeScaled = useScaleConditional(imageSize);
  let size = mediaSizeScaled;
  let content = null;

  if (props.type === 'icon') {
    content = (
      <Icon size="s" name={props.name} color={props.pressable ? 'primary' : 'foreground'} />
    );
  }

  if (props.type === 'asset' || props.type === 'avatar') {
    content = (
      <RemoteImage
        accessibilityHint={props.title}
        accessibilityLabel={props.title}
        source={getSource(props.source)}
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
        source={getSource(props.source)}
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
