import React, { memo } from 'react';

import { IconButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { StyleSheet, View } from 'react-native';

import { Icon } from '../icons/Icon';
import { Pressable, PressableProps } from '../system/Pressable';

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
        <Icon name={name} size="s" color={color} />
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
