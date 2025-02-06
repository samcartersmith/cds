import React, { memo, useCallback, useMemo, useRef } from 'react';
import { Animated, GestureResponderEvent } from 'react-native';
import {
  activeScale,
  inactiveScale,
  scaleInConfig,
  scaleOutConfig,
} from '@cbhq/cds-common2/animation/likeButton';
import { LikeButtonBaseProps } from '@cbhq/cds-common2/types';
import { getButtonSizeProps } from '@cbhq/cds-common2/utils/getButtonSizeProps';
import { getButtonSpacingProps } from '@cbhq/cds-common2/utils/getButtonSpacingProps';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { useTheme } from '../hooks/useTheme';
import { TextIcon } from '../icons/TextIcon';
import { HStack } from '../layout/HStack';
import { Pressable, PressableProps } from '../system/Pressable';
import { TextLabel1 } from '../typography/TextLabel1';

export type LikeButtonProps = LikeButtonBaseProps & PressableProps;

const scaleIn = convertMotionConfig(scaleInConfig);
const scaleOut = convertMotionConfig(scaleOutConfig);

export const LikeButton = memo(function LikeButton({
  count = 0,
  compact = true,
  flush,
  liked = false,
  onPress,
  accessibilityHint,
  accessibilityLabel = 'Like',
  ...props
}: LikeButtonProps) {
  const theme = useTheme();
  const iconScale = useRef(new Animated.Value(1));

  const {
    iconSize,
    minHeight: size,
    offsetEnd,
    offsetStart,
  } = useMemo(() => {
    const sizeProps = getButtonSizeProps({ compact });
    const spacingProps = getButtonSpacingProps({ compact, flush });
    return {
      ...sizeProps,
      ...spacingProps,
    };
  }, [compact, flush]);

  const pressableStyles = {
    marginLeft: -theme.space[offsetStart ?? 0],
    marginRight: -theme.space[offsetEnd ?? 0],
  };

  const handleOnPress = useCallback(
    (e: GestureResponderEvent) => {
      onPress?.(e);
      if (!liked) {
        const scaleInAnimation = Animated.timing(iconScale.current, scaleIn);
        const scaleOutAnimation = Animated.timing(iconScale.current, scaleOut);
        Animated.sequence([scaleInAnimation, scaleOutAnimation]).start();
      }
    },
    [liked, onPress],
  );

  const iconStyles = useMemo(
    () => ({
      opacity: iconScale.current.interpolate({
        inputRange: [inactiveScale, activeScale],
        outputRange: [1, 0.8],
      }),
      transform: [{ scale: iconScale.current }],
    }),
    [],
  );

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      background="transparent"
      feedback="light"
      onPress={handleOnPress}
      style={pressableStyles}
      {...props}
    >
      <HStack
        alignItems="center"
        flexShrink={0}
        flexWrap="nowrap"
        gap={1}
        justifyContent="flex-start"
        minHeight={size}
        minWidth={size}
      >
        <TextIcon
          animated
          color={liked ? 'fgNegative' : 'fg'}
          name={liked ? 'heartActive' : 'heartInactive'}
          size={iconSize}
          style={iconStyles}
        />
        {count > 0 ? <TextLabel1 mono>{count}</TextLabel1> : null}
      </HStack>
    </Pressable>
  );
});

LikeButton.displayName = 'LikeButton';
