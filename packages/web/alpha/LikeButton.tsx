import React, { memo, useMemo } from 'react';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { LikeButtonBaseProps } from '@cbhq/cds-common/types/alpha';
import { getButtonSizeProps } from '@cbhq/cds-common/utils/getButtonSizeProps';
import { getButtonSpacingProps } from '@cbhq/cds-common/utils/getButtonSpacingProps';

import { useInternalSpacingStyles } from '../hooks/internal/useInternalSpacingStyles';
import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { OnPress, Pressable, PressableProps } from '../system/Pressable';
import { TextLabel1 } from '../typography/TextLabel1';

export type LikeButtonProps = LikeButtonBaseProps<OnPress, PressableProps>;

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
    offsetHorizontal,
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
    horizontal: offsetHorizontal,
  });

  return (
    <Pressable backgroundColor="transparent" className={pressableClassName} {...props}>
      <HStack
        alignItems="center"
        justifyContent="flex-start"
        flexWrap="nowrap"
        flexShrink={0}
        minHeight={size}
        minWidth={size}
        gap={1}
      >
        <Icon
          name={liked ? 'heartActive' : 'heartInactive'}
          color={liked ? 'negative' : 'foreground'}
          size={iconSize}
        />
        {count > 0 ? (
          <TextLabel1 as="p" mono>
            {count}
          </TextLabel1>
        ) : null}
      </HStack>
    </Pressable>
  );
});

LikeButton.displayName = 'LikeButton';
