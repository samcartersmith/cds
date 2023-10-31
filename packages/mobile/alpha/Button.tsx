import React, { ForwardedRef, forwardRef, isValidElement, memo, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
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

export const Button = memo(
  forwardRef(function Button(
    {
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
    }: ButtonProps,
    ref: ForwardedRef<View>,
  ) {
    const palette = usePalette();
    const scale = useScale();
    const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
    const { borderRadius, minHeight, iconSize } = useMemo(
      () => getButtonSizeProps({ compact, scale }),
      [compact, scale],
    );

    const { spacingStart, spacingEnd, offsetStart, offsetEnd } = useMemo(
      () => getButtonSpacingProps({ compact, flush, startIcon, endIcon }),
      [compact, endIcon, flush, startIcon],
    );
    const spacingStyles = useInternalSpacingStyles({
      isInverted: true,
      start: offsetStart,
      end: offsetEnd,
    });
    const pressableStyles = useMemo(
      () => ({
        ...(block ? styles.block : styles.inline),
        ...spacingStyles,
      }),
      [block, spacingStyles],
    );

    const justifyContent = useMemo(() => {
      if (flush) {
        return 'flex-start';
      }
      if (startIcon || endIcon) {
        return 'space-between';
      }
      return 'center';
    }, [endIcon, flush, startIcon]);

    const childrenNode = useMemo(
      () =>
        isValidElement(children) && Boolean(children.props.children) ? (
          children
        ) : (
          <TextHeadline
            align="center"
            color={color}
            dangerouslySetStyle={styles.text}
            numberOfLines={numberOfLines}
            selectable="none"
            testID="text-headline"
          >
            {children}
          </TextHeadline>
        ),
      [children, color, numberOfLines],
    );

    return (
      <Pressable
        ref={ref}
        accessibilityHint={loading ? 'Button is loading' : accessibilityHint}
        accessibilityLabel={loading ? 'loading' : accessibilityLabel}
        backgroundColor={backgroundColor}
        block={block}
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderWidth="button"
        feedback={feedback}
        loading={loading}
        noScaleOnPress={noScaleOnPress}
        style={pressableStyles}
        transparentWhileInactive={transparent}
        {...props}
      >
        <HStack
          alignItems="center"
          dangerouslySetStyle={block ? styles.block : styles.inline}
          flexWrap="nowrap"
          justifyContent={justifyContent}
          minHeight={minHeight}
          spacingEnd={spacingEnd}
          spacingStart={spacingStart}
        >
          {loading ? (
            <ActivityIndicator color={palette[color]} size="small" />
          ) : (
            <>
              {!!startIcon && (
                <Icon
                  color={color}
                  dangerouslySetStyle={styles.icon}
                  name={startIcon}
                  size={iconSize}
                  spacingEnd={1}
                />
              )}
              {childrenNode}
              {!!endIcon && (
                <Icon
                  color={color}
                  dangerouslySetStyle={styles.icon}
                  name={endIcon}
                  size={iconSize}
                  spacingStart={1}
                />
              )}
            </>
          )}
        </HStack>
      </Pressable>
    );
  }),
);

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
