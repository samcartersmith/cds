import React, { ForwardedRef, forwardRef, isValidElement, memo, useMemo } from 'react';
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

export const DeprecatedButton = memo(
  forwardRef(function DeprecatedButton(
    {
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
    }: ButtonProps,
    ref: ForwardedRef<View>,
  ) {
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

    const childrenNode = useMemo(
      () =>
        isValidElement(children) && Boolean(children.props.children) ? (
          children
        ) : (
          <TextHeadline
            color={color}
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
        feedback={feedback ?? (compact ? 'light' : 'normal')}
        loading={loading}
        noScaleOnPress={noScaleOnPress}
        style={pressableStyles}
        transparentWhileInactive={transparent}
        {...props}
      >
        <View style={buttonStyles}>
          {loading ? (
            <ActivityIndicator color={palette[color]} size="small" />
          ) : (
            <>
              {!!startIcon && (
                <View style={startIconStyles}>
                  <Icon color={color} name={startIcon} size={iconSize} />
                </View>
              )}
              {childrenNode}
              {!!endIcon && (
                <View style={endIconStyles}>
                  <Icon color={color} name={endIcon} size={iconSize} />
                </View>
              )}
            </>
          )}
        </View>
      </Pressable>
    );
  }),
);

export const Button = memo(
  forwardRef(function Button(props: ButtonProps, ref: ForwardedRef<View>) {
    const hasFrontier = useFeatureFlag('frontierButton');
    return hasFrontier ? <FrontierButton {...props} /> : <DeprecatedButton {...props} ref={ref} />;
  }),
);

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
