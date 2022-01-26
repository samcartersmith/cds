import React, { memo, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ButtonBaseProps } from '@cbhq/cds-common';
import { useButtonBorderRadius } from '@cbhq/cds-common/src/hooks/useButtonBorderRadius';
import { useButtonIconSize } from '@cbhq/cds-common/src/hooks/useButtonIconSize';
import { useButtonVariant } from '@cbhq/cds-common/src/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/src/hooks/useInteractableHeight';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { useFlushStyles } from '../hooks/useFlushStyles';
import { usePalette } from '../hooks/usePalette';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Icon } from '../icons/Icon';
import { Pressable, PressableProps } from '../system/Pressable';
import { useFeatureFlag } from '../system/useFeatureFlag';
import { TextHeadline } from '../typography/TextHeadline';

export type ButtonProps = ButtonBaseProps & PressableProps;

export const Button = memo(function Button({
  block,
  children,
  compact,
  endIcon,
  feedback,
  loading,
  startIcon,
  transparent,
  flush,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const palette = usePalette();
  const height = useInteractableHeight(compact);
  const borderRadius = useButtonBorderRadius(compact);
  const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
  const hasIcon = Boolean(startIcon ?? endIcon);
  const hasFrontier = useFeatureFlag('frontierButton');
  const iconSize = useButtonIconSize(compact);
  const spacingStyles = useButtonSpacing({ flush, compact, startIcon, endIcon });
  const flushStyles = useFlushStyles({ flush, spacing: spacingStyles });
  const layoutStyles = block ? styles.block : styles.inline;
  const pressableStyles = useMemo(() => [layoutStyles, flushStyles], [layoutStyles, flushStyles]);
  const frontierButtonStyles = hasFrontier && hasIcon && styles.frontierButton;
  const startIconFrontierStyles = hasFrontier && [styles.frontierIcon, styles.frontierStartIcon];
  const endIconFrontierStyles = hasFrontier && [styles.frontierIcon, styles.frontierEndIcon];
  const buttonStyles = useMemo(
    () => [styles.button, { height }, spacingStyles],
    [height, spacingStyles],
  );
  const startIconStyles = useSpacingStyles({ spacingEnd: 1 });
  const endIconStyles = useSpacingStyles({ spacingStart: 1 });

  return (
    <Pressable
      transparentWhileInactive={transparent}
      backgroundColor={backgroundColor}
      block={block}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderWidth="button"
      feedback={feedback ?? (compact ? 'light' : 'normal')}
      loading={loading}
      style={pressableStyles}
      {...props}
    >
      <View style={[buttonStyles, frontierButtonStyles]}>
        {loading ? (
          <ActivityIndicator size="small" color={palette[color]} />
        ) : (
          <>
            {!!startIcon && (
              <View style={[startIconStyles, startIconFrontierStyles]}>
                <Icon name={startIcon} size={iconSize} color={color} />
              </View>
            )}
            <TextHeadline color={color} selectable="none" noWrap>
              {children}
            </TextHeadline>
            {!!endIcon && (
              <View style={[endIconStyles, endIconFrontierStyles]}>
                <Icon name={endIcon} size={iconSize} color={color} />
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
  // Frontier specific styles
  frontierButton: {
    justifyContent: 'space-between',
  },
  frontierIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
  },
  frontierStartIcon: {
    justifyContent: 'flex-start',
  },
  frontierEndIcon: {
    justifyContent: 'flex-end',
  },
});
