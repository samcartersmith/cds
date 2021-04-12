import React, { memo, useMemo } from 'react';

import { ButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { usePalette } from '../hooks/usePalette';
import { Pressable, PressableProps } from '../system/Pressable';
import { TextHeadline } from '../typography/TextHeadline';

export interface ButtonProps extends ButtonBaseProps, PressableProps {}

export const Button = memo(function Button({
  block,
  children,
  compact,
  feedback,
  loading,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const palette = usePalette();
  const { color, backgroundColor, borderColor } = useButtonVariant(variant);
  const spacingStyles = useButtonSpacing(compact);
  const buttonStyles = useMemo(
    () => [
      styles.button,
      compact && styles.buttonCompact,
      block ? styles.block : styles.inline,
      spacingStyles,
    ],
    [block, compact, spacingStyles]
  );

  return (
    <Pressable
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius={compact ? 'compact' : 'standard'}
      borderWidth="button"
      feedback={feedback || (compact ? 'light' : 'normal')}
      loading={loading}
      {...props}
    >
      <View style={buttonStyles}>
        {loading ? (
          <ActivityIndicator size="small" color={palette[color]} />
        ) : (
          <TextHeadline color={color}>{children}</TextHeadline>
        )}
      </View>
    </Pressable>
  );
});

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 56,
  },
  buttonCompact: {
    height: 36,
  },
  inline: {
    width: 'auto',
    minWidth: 64,
  },
  block: {
    width: '100%',
    maxWidth: '100%',
  },
});
