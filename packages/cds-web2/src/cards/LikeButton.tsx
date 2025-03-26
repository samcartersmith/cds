import React, { memo, useMemo } from 'react';
import type { LikeButtonBaseProps } from '@cbhq/cds-common2/types';
import { getButtonSizeProps } from '@cbhq/cds-common2/utils/getButtonSizeProps';
import { getButtonSpacingProps } from '@cbhq/cds-common2/utils/getButtonSpacingProps';

import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

export type LikeButtonProps = LikeButtonBaseProps;

export const LikeButton = memo(function LikeButton({
  count = 0,
  compact = true,
  flush,
  liked = false,
}: LikeButtonProps) {
  const { iconSize, minHeight: size } = useMemo(() => {
    const sizeProps = getButtonSizeProps({ compact });
    const spacingProps = getButtonSpacingProps({ compact, flush });
    return {
      ...sizeProps,
      ...spacingProps,
    };
  }, [compact, flush]);

  return (
    <Pressable background="transparent">
      <HStack
        alignItems="center"
        flexShrink={0}
        flexWrap="nowrap"
        gap={1}
        justifyContent="flex-start"
        minHeight={size}
        minWidth={size}
      >
        <Icon
          color={liked ? 'fgNegative' : 'fg'}
          name={liked ? 'heartActive' : 'heartInactive'}
          size={iconSize}
        />
        {count > 0 ? (
          <Text mono as="p" display="block" font="label1">
            {count}
          </Text>
        ) : null}
      </HStack>
    </Pressable>
  );
});

LikeButton.displayName = 'LikeButton';
