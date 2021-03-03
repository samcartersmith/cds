import React, { useMemo, forwardRef } from 'react';

import { ButtonBaseProps } from '@cbhq/cds-common';
import { cx } from 'linaria';
import { mergeProps } from 'react-aria';

import { useInteractable, InteractableProps } from '../hooks/useInteractable';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { TextHeadline } from '../Text/Text';
import * as buttonStyles from './buttonStyles';

export interface ButtonProps
  extends ButtonBaseProps,
    InteractableProps<HTMLButtonElement>,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'children' | 'className' | 'onClick' | 'onClickCapture' | 'style'
    > {}

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
    const backgroundColor = useMemo(
      () => (variant === 'negative' || (variant === 'primary' && compact) ? 'background' : variant),
      [compact, variant]
    );
    const { className, props, style } = useInteractable<HTMLButtonElement>({
      ...restProps,
      backgroundColor,
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
        className={cx(
          className,
          buttonStyles.button,
          buttonStyles[variant],
          compact && buttonStyles.buttonCompact,
          compact && variant === 'primary' && buttonStyles.primaryCompact,
          block && buttonStyles.buttonBlock,
          spacingClass
        )}
        style={style}
        ref={ref}
      >
        <TextHeadline as="span" color="currentColor">
          {children}
        </TextHeadline>
      </button>
    );
  }
);
