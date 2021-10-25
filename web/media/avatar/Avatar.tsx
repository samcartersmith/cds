import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';
import React, { memo } from 'react';
import { cx } from 'linaria';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusAlias';
import { useAvatarSize } from '@cbhq/cds-common/media/useAvatarSize';
import { useAvatarSrc } from '@cbhq/cds-common/media/useAvatarSrc';
import { Box } from '../../layout';
import * as avatarStyles from './avatarStyles';
import { RemoteImage } from '../RemoteImage';

const staticClassName = 'cds-avatar';

type AvatarWebProps = {
  /**
   * @danger Adds a className to the Avatar. If you pass in a className make sure your styles override the Avatar using the avatar class .cds-avatar like this: .my-class.cds-avatar
   */
  dangerouslySetClassName?: string;
} & AvatarBaseProps;

export const Avatar: React.FC<AvatarWebProps> = memo(
  ({
    alt,
    src,
    shape = 'circle',
    size = 'l',
    borderColor,
    dangerouslySetClassName,
    testID,
    dangerouslySetSize,
  }) => {
    const borderRadius = useShapeToBorderRadiusAlias(shape);
    const avatarSize = useAvatarSize(size);
    const imgSrc = useAvatarSrc(src);

    const computedSize = dangerouslySetSize ?? avatarSize;

    return (
      <Box
        dangerouslySetClassName={cx(
          staticClassName,
          dangerouslySetClassName as string,
          borderColor ? avatarStyles.borderStyles : undefined,
        )}
        dangerouslySetBackground={src}
        borderRadius={borderRadius}
        borderColor={borderColor}
        width={computedSize}
        height={computedSize}
        position="relative"
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        flexGrow={0}
        data-testid={testID}
      >
        <RemoteImage width={computedSize} height={computedSize} source={imgSrc} alt={alt} />
      </Box>
    );
  },
);
