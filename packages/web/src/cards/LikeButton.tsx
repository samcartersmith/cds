import React, { memo, useMemo } from 'react';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { LikeButtonBaseProps } from '@cbhq/cds-common/types';
import { getButtonSizeProps } from '@cbhq/cds-common/utils/getButtonSizeProps';
import { getButtonSpacingProps } from '@cbhq/cds-common/utils/getButtonSpacingProps';

import { useInternalSpacingStyles } from '../hooks/internal/useInternalSpacingStyles';
import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { Pressable, PressableProps } from '../system/Pressable';
import { TextLabel1 } from '../typography/TextLabel1';

export type LikeButtonProps = LikeButtonBaseProps & PressableProps;

export const LikeButton = memo(function LikeButton({
  count = 0,
  compact = true,
  flush,
  liked = false,
  ...props
}: LikeButtonProps) {
  const scale = useScale();
  const {
    iconSize,
    minHeight: size,
    offsetEnd,
    offsetStart,
  } = useMemo(() => {
    const sizeProps = getButtonSizeProps({ compact, scale });
    const spacingProps = getButtonSpacingProps({ compact, flush });
    return {
      ...sizeProps,
      ...spacingProps,
    };
  }, [compact, flush, scale]);

  const pressableClassName = useInternalSpacingStyles({
    isInverted: true,
    start: offsetStart,
    end: offsetEnd,
  });

  return (
    <Pressable background="transparent" className={pressableClassName} {...props}>
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
          color={liked ? 'negative' : 'foreground'}
          name={liked ? 'heartActive' : 'heartInactive'}
          size={iconSize}
        />
        {count > 0 ? (
          <TextLabel1 mono as="p">
            {count}
          </TextLabel1>
        ) : null}
      </HStack>
    </Pressable>
  );
});

LikeButton.displayName = 'LikeButton';
