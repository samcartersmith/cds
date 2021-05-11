import React, { memo } from 'react';

import { IconName } from '@cbhq/cds-common';
import { imageSize, mediaSize } from '@cbhq/cds-common/tokens/cell';
import { ImageSourcePropType } from 'react-native';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { RemoteImage } from '../media/RemoteImage';

export type CellMediaSource = string | ImageSourcePropType;
export type CellMediaType = 'asset' | 'photo' | 'image' | 'icon';

export type CellMediaProps =
  | {
      type: 'icon';
      name: IconName;
      testID?: string;
    }
  | {
      type: 'asset' | 'photo' | 'image';
      source: CellMediaSource;
      testID?: string;
    };

export const CellMedia = memo(function CellMedia(props: CellMediaProps) {
  let size = mediaSize;
  let content = null;

  if (props.type === 'icon') {
    content = <Icon size="m" name={props.name} color="foreground" />;
  }

  if (props.type === 'asset' || props.type === 'photo') {
    content = (
      <RemoteImage
        source={typeof props.source === 'string' ? { uri: props.source } : props.source}
        resizeMode="cover"
        shape="circle"
        width={size}
        height={size}
      />
    );
  }

  if (props.type === 'image') {
    size = imageSize;
    content = (
      <RemoteImage
        source={typeof props.source === 'string' ? { uri: props.source } : props.source}
        resizeMode="cover"
        shape="squircle"
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
