import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';
import React, { memo } from 'react';
import { cx } from 'linaria';
import { useBackground } from '@cbhq/cds-common/avatar/useBackground';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusAlias';
import { useDimension } from '@cbhq/cds-common/avatar/useDimension';
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

type AvatarTextProps = {
  name: string;
  compact?: boolean;
  size: number;
};

const AvatarText: React.FC<AvatarTextProps> = memo(({ name, compact, size }) => {
  const TextEl = compact ? TextTitle3 : TextTitle1;

  const fontStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontSize: `${Math.floor(size / 2)}px`,
  };

  const textNode = (
    <TextEl align="center" color="secondary" as="span">
      <span style={fontStyle}>{name.substring(0, 1).toLocaleUpperCase()}</span>
    </TextEl>
  );

  return (
    <Box alignItems="center" justifyContent="center" width="100%" height="100%">
      {textNode}
    </Box>
  );
});

export const Avatar: React.FC<AvatarWebProps> = memo(
  ({ name, src, shape = 'circle', size, compact, borderColor, dangerouslySetClassName }) => {
    const borderRadius = useShapeToBorderRadiusAlias(shape);
    const { width, height } = useDimension(compact, size);
    const background = useBackground(name);

    const childNode = src ? (
      <RemoteImage width={width} height={height} source={src} alt={name} />
    ) : (
      <AvatarText name={name.length === 0 ? 'u' : name} size={width} compact={compact} />
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
        flexShrink={0}
        flexGrow={0}
      >
        {childNode}
      </Box>
    );
  },
);
