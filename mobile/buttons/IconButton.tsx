import React, { memo } from 'react';

import { IconButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { StyleSheet, View } from 'react-native';

import { Icon } from '../icons/Icon';
import { Pressable, PressableProps } from '../system/Pressable';

export interface IconButtonProps extends IconButtonBaseProps, PressableProps {}

export const IconButton = memo(function IconButton({
  feedback = 'light',
  name,
  variant = 'secondary',
  ...props
}: IconButtonProps) {
  const { color, backgroundColor, borderColor } = useButtonVariant(variant);

  return (
    <Pressable
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius="round"
      borderWidth="button"
      feedback={feedback}
      {...props}
    >
      <View style={styles.iconButton}>
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
    height: 40,
    width: 40,
  },
});
