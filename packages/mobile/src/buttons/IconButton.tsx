import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButtonBaseProps } from '@cbhq/cds-common';
import { useButtonIconSize } from '@cbhq/cds-common/src/hooks/useButtonIconSize';
import { useButtonVariant } from '@cbhq/cds-common/src/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/src/hooks/useInteractableHeight';

import { Icon } from '../icons/Icon';
import { Pressable, PressableProps } from '../system/Pressable';
import { useFeatureFlag } from '../system/useFeatureFlag';

export type IconButtonProps = IconButtonBaseProps & PressableProps;

export const IconButton = memo(function IconButton({
  compact = true,
  feedback = 'light',
  name,
  transparent,
  variant = 'secondary',
  ...props
}: IconButtonProps) {
  const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
  const height = useInteractableHeight(compact);
  const hasFrontier = useFeatureFlag('frontierButton');
  const iconSize = useButtonIconSize(compact);

  return (
    <Pressable
      transparentWhileInactive={transparent}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius="round"
      borderWidth="button"
      feedback={feedback}
      {...props}
    >
      <View style={[styles.iconButton, { height, width: height }]}>
        <Icon name={name} size={hasFrontier ? iconSize : 's'} color={color} />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  iconButton: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
