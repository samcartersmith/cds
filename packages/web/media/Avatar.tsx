import React, { memo } from 'react';
import { css } from 'linaria';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusAlias';
import { useAvatarSize } from '@cbhq/cds-common/media/useAvatarSize';
import { useAvatarSrc } from '@cbhq/cds-common/media/useAvatarSrc';
import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';

import { Box } from '../layout';
import { palette } from '../tokens';
import { cx } from '../utils/linaria';

import { RemoteImage } from './RemoteImage';

const staticClassName = 'cds-avatar';
const borderWidth = 2;

export const borderStyles = css`
  &.${staticClassName} {
    border-width: ${borderWidth}px;
  }
`;

const selectedBorderStyles = css`
  box-shadow: 0 0 0 ${borderWidth}px ${palette.foreground};
`;

type AvatarWebProps = {
  /**
   * @danger Adds a className to the Avatar. If you pass in a className make sure your styles override the Avatar using the avatar class .cds-avatar like this: .my-class.cds-avatar
   */
  dangerouslySetClassName?: string;
  /** Adds treatment that indicates that the Avatar is currently selected */
  selected?: boolean;
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
    selected,
  }) => {
    const borderRadius = useShapeToBorderRadiusAlias(shape);
    const avatarSize = useAvatarSize(size);
    const imgSrc = useAvatarSrc(src);

    const computedSize = dangerouslySetSize ?? avatarSize;
    const hasBorder = borderColor ?? selected;

    return (
      <Box
        dangerouslySetClassName={cx(
          staticClassName,
          dangerouslySetClassName as string,
          hasBorder ? borderStyles : undefined,
          selected ? selectedBorderStyles : undefined,
        )}
        dangerouslySetBackground={src}
        borderRadius={borderRadius}
        borderColor={selected ? 'transparent' : borderColor}
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
