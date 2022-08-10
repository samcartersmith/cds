import React, { memo, useMemo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import type { ButtonBaseProps } from '@cbhq/cds-common/types/alpha';
import { ComponentEventHandlerProps } from '@cbhq/cds-common/types/ComponentEventHandlerProps';
import { getButtonSizeProps } from '@cbhq/cds-common/utils/getButtonSizeProps';
import { getButtonSpacingProps } from '@cbhq/cds-common/utils/getButtonSpacingProps';

import { useInternalSpacingStyles } from '../hooks/internal/useInternalSpacingStyles';
import { usePalette } from '../hooks/usePalette';
import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { OnPress, Pressable, PressableProps } from '../system/Pressable';
import { TextHeadline } from '../typography/TextHeadline';

export type ButtonProps = ButtonBaseProps<OnPress> &
  Omit<PressableProps, 'onPress'> &
  ComponentEventHandlerProps;

export const Button = memo(function Button({
  block,
  children,
  compact,
  endIcon,
  feedback = compact ? 'light' : 'normal',
  loading,
  startIcon,
  transparent,
  flush,
  variant = 'primary',
  numberOfLines = 1,
  noScaleOnPress,
  accessibilityLabel,
  accessibilityHint,
  ...props
}: ButtonProps) {
  const palette = usePalette();
  const scale = useScale();
  const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
  const { borderRadius, minHeight, iconSize } = useMemo(
    () => getButtonSizeProps({ compact, scale }),
    [compact, scale],
  );

  const { spacingStart, spacingEnd, offsetHorizontal } = useMemo(
    () => getButtonSpacingProps({ compact, flush, startIcon, endIcon }),
    [compact, endIcon, flush, startIcon],
  );
  const spacingStyles = useInternalSpacingStyles({
    isInverted: true,
    horizontal: offsetHorizontal,
  });
  const pressableStyles = useMemo(
    () => ({ ...spacingStyles, ...(block ? styles.block : styles.inline) }),
    [block, spacingStyles],
  );

  const justifyContent = useMemo(() => {
    if (startIcon || endIcon) {
      return 'space-between';
    }
    return 'center';
  }, [endIcon, startIcon]);

  return (
    <Pressable
      transparentWhileInactive={transparent}
      backgroundColor={backgroundColor}
      block={block}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderWidth="button"
      feedback={feedback}
      loading={loading}
      style={pressableStyles}
      noScaleOnPress={noScaleOnPress}
      accessibilityLabel={loading ? 'loading' : accessibilityLabel}
      accessibilityHint={loading ? 'Button is loading' : accessibilityHint}
      {...props}
    >
      <HStack
        justifyContent={justifyContent}
        alignItems="center"
        flexWrap="nowrap"
        minHeight={minHeight}
        dangerouslySetStyle={block ? styles.block : styles.inline}
        spacingStart={spacingStart}
        spacingEnd={spacingEnd}
      >
        {loading ? (
          <ActivityIndicator size="small" color={palette[color]} />
        ) : (
          <>
            {!!startIcon && (
              <Icon
                name={startIcon}
                size={iconSize}
                color={color}
                spacingEnd={1}
                dangerouslySetStyle={styles.icon}
              />
            )}
            <TextHeadline
              color={color}
              selectable="none"
              numberOfLines={numberOfLines}
              align="center"
              dangerouslySetStyle={styles.text}
            >
              {children}
            </TextHeadline>
            {!!endIcon && (
              <Icon
                name={endIcon}
                size={iconSize}
                color={color}
                spacingStart={1}
                dangerouslySetStyle={styles.icon}
              />
            )}
          </>
        )}
      </HStack>
    </Pressable>
  );
});

export const styles = StyleSheet.create({
  inline: {
    width: 'auto',
    minWidth: 64,
  },
  block: {
    width: '100%',
    maxWidth: '100%',
  },
  text: { flexShrink: 1 },
  icon: {
    flexShrink: 0,
  },
});

Button.displayName = 'Button';
