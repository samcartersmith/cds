import React, { memo, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import { ButtonBaseProps } from '@cbhq/cds-common';
import { useButtonBorderRadius } from '@cbhq/cds-common/hooks/useButtonBorderRadius';
import { useButtonIconSize } from '@cbhq/cds-common/hooks/useButtonIconSize';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';

import { Button as FrontierButton } from '../alpha/Button';
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

export const DeprecatedButton = memo(function DeprecatedButton({
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
  accessibilityHint,
  accessibilityLabel,
  ...props
}: ButtonProps) {
  const palette = usePalette();
  const height = useInteractableHeight(compact);
  const borderRadius = useButtonBorderRadius(compact);
  const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
  const iconSize = useButtonIconSize(compact);
  const spacingStyles = useButtonSpacing({ flush, compact, startIcon, endIcon });
  const flushStyles = getFlushStyles({ flush, spacing: spacingStyles });
  const layoutStyles = block ? styles.block : styles.inline;
  const pressableStyles = useMemo(() => [layoutStyles, flushStyles], [layoutStyles, flushStyles]);
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
      accessibilityLabel={loading ? 'loading' : accessibilityLabel}
      accessibilityHint={loading ? 'Button is loading' : accessibilityHint}
      {...props}
    >
      <View style={buttonStyles}>
        {loading ? (
          <ActivityIndicator size="small" color={palette[color]} />
        ) : (
          <>
            {!!startIcon && (
              <View style={startIconStyles}>
                <Icon name={startIcon} size={iconSize} color={color} />
              </View>
            )}
            <TextHeadline color={color} selectable="none" numberOfLines={numberOfLines}>
              {children}
            </TextHeadline>
            {!!endIcon && (
              <View style={endIconStyles}>
                <Icon name={endIcon} size={iconSize} color={color} />
              </View>
            )}
          </>
        )}
      </View>
    </Pressable>
  );
});

export const Button = memo(function Button(props: ButtonProps) {
  const hasFrontier = useFeatureFlag('frontierButton');
  return hasFrontier ? <FrontierButton {...props} /> : <DeprecatedButton {...props} />;
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
