import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';
import React, { memo } from 'react';
import { cx } from 'linaria';
import { useBackground } from '@cbhq/cds-common/avatar/useBackground';
import { AvatarText, AvatarTextTitle } from '@cbhq/cds-common/avatar/AvatarText';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusAlias';
import { useDimension } from '@cbhq/cds-common/avatar/useDimension';
import { BoxBaseProps } from '@cbhq/cds-common';
import { Box } from '../layout';
import * as avatarStyles from './avatarStyles';
import { TextTitle1, TextTitle3 } from '../typography';
import { RemoteImage } from '../media/RemoteImage';

const staticClassName = 'cds-avatar';

type AvatarWebProps = {
  /**
   * @danger Adds a className to the Avatar. If you pass in a className make sure your styles override the Avatar using the avatar class .cds-avatar like this: .my-class.cds-avatar
   */
  dangerouslySetClassName?: string;
} & AvatarBaseProps;

export const Avatar: React.FC<AvatarWebProps> = memo(
  ({
    name,
    src,
    shape = 'circle',
    dangerouslySetSize,
    compact,
    borderColor,
    dangerouslySetClassName,
  }) => {
    const borderRadius = useShapeToBorderRadiusAlias(shape);
    const { width, height } = useDimension(compact, dangerouslySetSize);
    const background = useBackground(name);

    const childNode = src ? (
      <RemoteImage width={width} height={height} source={src} alt={name} />
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
        dangerouslySetClassName={cx(
          staticClassName,
          dangerouslySetClassName as string,
          borderColor ? avatarStyles.borderStyles : undefined,
        )}
        dangerouslySetBackground={src ? undefined : background}
        borderRadius={borderRadius}
        borderColor={borderColor}
        width={width}
        height={height}
        position="relative"
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
      >
        {childNode}
      </Box>
    );
  },
);
