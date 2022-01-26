import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusAlias';
import { useAvatarSize } from '@cbhq/cds-common/media/useAvatarSize';
import { useAvatarSrc } from '@cbhq/cds-common/media/useAvatarSrc';
import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';

import { Box } from '../layout';

import { RemoteImage } from './RemoteImage';

export const Avatar: React.FC<AvatarBaseProps> = memo(
  ({ src, shape = 'circle', size = 'l', borderColor, testID, dangerouslySetSize }) => {
    const borderRadius = useShapeToBorderRadiusAlias(shape);
    const avatarSize = useAvatarSize(size);
    const imgSrc = useAvatarSrc(src);

    const computedSize = dangerouslySetSize ?? avatarSize;

    return (
      <Box
        dangerouslySetBackground={src}
        borderRadius={borderRadius}
        borderColor={borderColor}
        width={computedSize}
        height={computedSize}
        position="relative"
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
        dangerouslySetStyle={borderColor ? styles.border : undefined}
        flexShrink={0}
        flexGrow={0}
        testID={testID}
      >
        <RemoteImage
          shape={shape}
          width={computedSize}
          height={computedSize}
          source={{ uri: imgSrc }}
          resizeMode="cover"
          testID={`${testID ?? ''}-image`}
        />
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  border: {
    borderWidth: 2,
  },
});
