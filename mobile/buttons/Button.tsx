import React, { memo, useMemo } from 'react';

import { ButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { useButtonBorderRadius } from '@cbhq/cds-common/hooks/useButtonBorderRadius';
import { useButtonIconSize } from '@cbhq/cds-common/hooks/useButtonIconSize';
import { StyleSheet, ActivityIndicator, View, ViewStyle } from 'react-native';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { usePalette } from '../hooks/usePalette';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Icon } from '../icons/Icon';
import { getFlushStyles } from '../styles/getFlushStyles';
import { Pressable, PressableProps } from '../system/Pressable';
import { useFeatureFlag } from '../system/useFeatureFlag';
import { TextHeadline } from '../typography/TextHeadline';

export type ButtonProps = ButtonBaseProps &
  PressableProps & {
    /**
     * When provided the Button text will not truncate and will wrap until the number of lines provided is met.
     * @default 1
     */
    numberOfLines?: number;
  };

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
  numberOfLines = 1,
  noScaleOnPress,
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
  const flushStyles = getFlushStyles({ flush, spacing: spacingStyles });
  const layoutStyles = block ? styles.block : styles.inline;
  const pressableStyles = useMemo(() => [layoutStyles, flushStyles], [layoutStyles, flushStyles]);
  const frontierButtonStyles = hasFrontier && hasIcon && styles.frontierButton;
  const startIconFrontierStyles = hasFrontier && [styles.frontierIcon, styles.frontierStartIcon];
  const endIconFrontierStyles = hasFrontier && [styles.frontierIcon, styles.frontierEndIcon];
  const justifyContent: ViewStyle['justifyContent'] = flush
    ? 'flex-start'
    : styles.button.justifyContent;
  const buttonStyles = useMemo(
    () => [styles.button, { minHeight: height }, { justifyContent }, spacingStyles],
    [height, spacingStyles, justifyContent],
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
      noScaleOnPress={noScaleOnPress}
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
            <TextHeadline color={color} selectable="none" numberOfLines={numberOfLines}>
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
