import React, { memo, useMemo } from 'react';

import { ButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { usePalette } from '../hooks/usePalette';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Icon } from '../icons/Icon';
import { Pressable, PressableProps } from '../system/Pressable';
import { TextHeadline } from '../typography/TextHeadline';

export interface ButtonProps extends ButtonBaseProps, PressableProps {}

export const Button = memo(function Button({
  block,
  children,
  compact,
  endIcon,
  feedback,
  loading,
  startIcon,
  transparent,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const palette = usePalette();
  const height = useInteractableHeight(compact);
  const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
  const spacingStyles = useButtonSpacing(compact);
  const pressableStyles = useMemo(() => [block ? styles.block : styles.inline], [block]);
  const buttonStyles = useMemo(() => [styles.button, { height }, spacingStyles], [
    height,
    spacingStyles,
  ]);
  const startIconStyles = useSpacingStyles({ spacingEnd: 1 });
  const endIconStyles = useSpacingStyles({ spacingStart: 1 });

  return (
    <Pressable
      transparentWhileInactive={transparent}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius={compact ? 'compact' : 'standard'}
      borderWidth="button"
      feedback={feedback || (compact ? 'light' : 'normal')}
      loading={loading}
      style={pressableStyles}
      {...props}
    >
      <View style={buttonStyles}>
        {loading ? (
          <ActivityIndicator size="small" color={palette[color]} />
        ) : (
          <>
            {startIcon && (
              <View style={startIconStyles}>
                <Icon name={startIcon} size={compact ? 'xs' : 's'} color={color} />
              </View>
            )}

            <TextHeadline color={color} selectable="none" noWrap>
              {children}
            </TextHeadline>

            {endIcon && (
              <View style={endIconStyles}>
                <Icon name={endIcon} size={compact ? 'xs' : 's'} color={color} />
              </View>
            )}
          </>
        )}
      </View>
    </Pressable>
  );
});

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
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
