import React, { forwardRef, isValidElement, memo, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useButtonVariant } from '@cbhq/cds-common2/hooks/useButtonVariant';
import type { ButtonBaseProps, ComponentEventHandlerProps } from '@cbhq/cds-common2/types';
import { getButtonSizeProps } from '@cbhq/cds-common2/utils/getButtonSizeProps';
import { getButtonSpacingProps } from '@cbhq/cds-common2/utils/getButtonSpacingProps';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { Pressable, PressableInternalProps, PressableProps } from '../system/Pressable';
import { TextHeadline } from '../typography/TextHeadline';

export type ButtonProps = ButtonBaseProps &
  PressableProps &
  ComponentEventHandlerProps &
  Pick<PressableInternalProps, 'wrapperStyles'>;

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
      start,
      end,
      wrapperStyles,
      ...props
    }: ButtonProps,
    ref: React.ForwardedRef<View>,
  ) {
    const theme = useTheme();
    const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
    const { borderRadius, minHeight, iconSize } = useMemo(
      () => getButtonSizeProps({ compact }),
      [compact],
    );

    const { spacingStart, spacingEnd, offsetStart, offsetEnd } = useMemo(
      () => getButtonSpacingProps({ compact, flush, startIcon, endIcon }),
      [compact, endIcon, flush, startIcon],
    );

    const pressableStyles = useMemo(
      () => ({
        ...(block ? styles.block : styles.inline),
        marginLeft: -theme.space[offsetStart ?? 0],
        marginRight: -theme.space[offsetEnd ?? 0],
      }),
      [block, theme.space, offsetStart, offsetEnd],
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
            numberOfLines={numberOfLines}
            selectable={false}
            style={styles.text}
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
        background={backgroundColor}
        block={block}
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderWidth={100}
        feedback={feedback}
        loading={loading}
        noScaleOnPress={noScaleOnPress}
        style={pressableStyles}
        transparentWhileInactive={transparent}
        wrapperStyles={wrapperStyles}
        {...props}
      >
        <HStack
          alignItems="center"
          flexWrap="nowrap"
          justifyContent={justifyContent}
          minHeight={minHeight}
          paddingLeft={spacingStart}
          paddingRight={spacingEnd}
          style={block ? styles.block : styles.inline}
        >
          {loading ? (
            <ActivityIndicator color={theme.color[color]} size="small" />
          ) : (
            <>
              {start ??
                (startIcon ? (
                  <Icon
                    color={color}
                    name={startIcon}
                    paddingRight={1}
                    size={iconSize}
                    style={styles.icon}
                  />
                ) : null)}
              {childrenNode}

              {end ??
                (endIcon ? (
                  <Icon
                    color={color}
                    name={endIcon}
                    paddingLeft={1}
                    size={iconSize}
                    style={styles.icon}
                  />
                ) : null)}
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
