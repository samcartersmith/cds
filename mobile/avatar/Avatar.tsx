import React, { memo } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusAlias';
import { useDimension } from '@cbhq/cds-common/avatar/useDimension';
import { useBackground } from '@cbhq/cds-common/avatar/useBackground';
import { TextTitle1, TextTitle3 } from '../typography';
import { Box } from '../layout';
import { RemoteImage } from '../media/RemoteImage';

type AvatarTextProps = {
  name: string;
  compact?: boolean;
  size: number;
};

const AvatarText: React.FC<AvatarTextProps> = memo(({ name, compact, size }) => {
  const TextEl = compact ? TextTitle3 : TextTitle1;

  const fontSize = Math.floor(size / 2);
  const fontStyle: TextStyle = {
    display: 'flex',
    alignItems: 'center',
    lineHeight: fontSize,
    fontSize,
  };

  const textNode = (
    <TextEl align="center" color="secondary">
      <Text style={fontStyle}>{name.substring(0, 1).toLocaleUpperCase()}</Text>
    </TextEl>
  );

  return (
    <Box alignItems="center" justifyContent="center" width="100%" height="100%">
      {textNode}
    </Box>
  );
});

export const Avatar: React.FC<AvatarBaseProps> = memo(
  ({ name, src, shape = 'circle', size, compact, borderColor }) => {
    const borderRadius = useShapeToBorderRadiusAlias(shape);
    const { width, height } = useDimension(compact, size);
    const background = useBackground(name);

    const childNode = src ? (
      <RemoteImage
        shape={shape}
        width={width}
        height={height}
        source={{ uri: src }}
        resizeMode="cover"
        testID="avatar-image"
      />
    ) : (
      <AvatarText name={name.length === 0 ? 'u' : name} compact={compact} size={width} />
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
        testID="avatar-box"
        flexShrink={0}
        flexGrow={0}
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
