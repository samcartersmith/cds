import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusAlias';
import { useDimension } from '@cbhq/cds-common/avatar/useDimension';
import { useBackground } from '@cbhq/cds-common/avatar/useBackground';
import { BoxBaseProps } from '@cbhq/cds-common';
import { AvatarText, AvatarTextTitle } from '@cbhq/cds-common/avatar/AvatarText';
import { TextTitle1, TextTitle3 } from '../typography';
import { Box } from '../layout';
import { RemoteImage } from '../media/RemoteImage';

export const Avatar: React.FC<AvatarBaseProps> = memo(
  ({ name, src, shape = 'circle', dangerouslySetSize, compact, borderColor }) => {
    const borderRadius = useShapeToBorderRadiusAlias(shape);
    const { width, height } = useDimension(compact, dangerouslySetSize);
    const background = useBackground(name);

    const childNode = src ? (
      <RemoteImage
        shape={shape}
        width={width}
        height={height}
        source={{ uri: src }}
        resizeMode="cover"
      />
    ) : (
      <AvatarText
        name={name.length === 0 ? 'u' : name}
        Box={Box as React.ComponentType<BoxBaseProps>}
        TextTitle1={TextTitle1 as React.ComponentType<AvatarTextTitle>}
        TextTitle3={TextTitle3 as React.ComponentType<AvatarTextTitle>}
        compact={compact}
        as="span"
      />
    );

    return (
      <Box
        dangerouslySetBackground={src ? undefined : background}
        borderRadius={borderRadius}
        borderColor={borderColor}
        width={width}
        height={height}
        position="relative"
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
        dangerouslySetStyle={borderColor ? styles.border : undefined}
      >
        {childNode}
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  border: {
    borderWidth: 2,
  },
});
