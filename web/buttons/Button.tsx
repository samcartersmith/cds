import React, { forwardRef } from 'react';

import { ButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { mergeProps } from '@cbhq/cds-common/utils/mergeProps';
import { cx } from 'linaria';
import { ButtonProps as ReakitButtonProps, Button as ReakitButton } from 'reakit/Button';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as foregroundColors from '../styles/foregroundColor';
import { TextHeadline } from '../typography/TextHeadline';
import * as buttonStyles from './buttonStyles';
import { InteractableProps, useInteractable } from './useInteractable';

export interface ButtonProps
  extends ButtonBaseProps,
    InteractableProps<HTMLButtonElement>,
    Omit<ReakitButtonProps, 'children' | 'className' | 'onClick' | 'onClickCapture' | 'style'> {}

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
      type = 'button',
      variant = 'primary',
      ...restProps
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const isDisabled = disabled || loading;
    const spacingClass = useSpacingStyles({
      spacingHorizontal: compact ? 2 : 3,
      spacingVertical: compact ? 1 : 2,
    });
    const { color, ...variantAliases } = useButtonVariant(variant);
    const { className, props, style } = useInteractable<HTMLButtonElement>({
      ...variantAliases,
      borderRadius: compact ? 'compact' : 'standard',
      isDisabled,
      onHover,
      onPress,
      scaleOnPress: true,
    });

    return (
      <ReakitButton
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
        disabled={isDisabled}
        ref={ref}
        style={style}
        type={type}
      >
        <TextHeadline as="span" color={color}>
          {children}
        </TextHeadline>
      </ReakitButton>
    );
  }
);
