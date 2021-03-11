import React, { forwardRef } from 'react';

import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { cx } from 'linaria';
import { mergeProps } from 'react-aria';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as foregroundColors from '../styles/foregroundColor';
import { TextHeadline } from '../typography/TextHeadline';
import { ButtonProps } from './ButtonProps';
import * as buttonStyles from './buttonStyles';
import { useInteractable } from './useInteractable';

export const Button = forwardRef(
  (
    {
      accessibilityLabel,
      block,
      children,
      compact,
      disabled = false,
      loading = false,
      onHover,
      onPress,
      testID,
      type,
      variant = 'primary',
      ...restProps
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const spacingClass = useSpacingStyles({
      spacingHorizontal: compact ? 2 : 3,
      spacingVertical: compact ? 0.5 : 1,
    });
    const { color, ...variantAliases } = useButtonVariant(variant);

    const { className, props, style } = useInteractable<HTMLButtonElement>({
      ...restProps,
      ...variantAliases,
      borderRadius: compact ? 'compact' : 'standard',
      buttonType: type,
      elementType: 'button',
      isDisabled: disabled || loading,
      onHover,
      onPress,
      ref,
      scaleOnPress: true,
    });

    return (
      <button
        {...mergeProps(props, restProps)}
        aria-label={accessibilityLabel}
        data-test-id={testID}
        className={cx(
          className,
          foregroundColors[color],
          buttonStyles.button,
          compact && buttonStyles.buttonCompact,
          block && buttonStyles.buttonBlock,
          spacingClass
        )}
        style={style}
        ref={ref}
      >
        <TextHeadline as="span" color={color}>
          {children}
        </TextHeadline>
      </button>
    );
  }
);

export { ButtonProps };
