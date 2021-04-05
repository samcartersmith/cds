import React, { forwardRef } from 'react';

import { ButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { cx } from 'linaria';
import { ButtonProps as ReakitButtonProps, Button as ReakitButton } from 'reakit/Button';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { MaterialSpinner } from '../loaders/MaterialSpinner';
import * as foregroundColors from '../styles/foregroundColor';
import { TextHeadline } from '../typography/TextHeadline';
import * as buttonStyles from './buttonStyles';
import { InteractableProps, useInteractable } from './useInteractable';

export interface ButtonProps
  extends ButtonBaseProps,
    InteractableProps<HTMLButtonElement>,
    Omit<
      ReakitButtonProps,
      | 'children'
      | 'className'
      | 'onClick'
      | 'onClickCapture'
      | 'style'
      | 'unstable_clickOnEnter'
      | 'unstable_clickOnSpace'
      | 'unstable_system'
      | 'wrapElement'
    > {}

export const Button = forwardRef(
  (
    {
      accessibilityLabel,
      block,
      children,
      compact,
      disabled,
      loading,
      onPress,
      testID,
      type = 'button',
      variant = 'primary',
      ...props
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const isDisabled = disabled || loading;
    const spacingClass = useButtonSpacing(compact);
    const { color, backgroundColor, borderColor } = useButtonVariant(variant);
    const { className, style } = useInteractable({
      backgroundColor,
      borderColor,
      borderRadius: compact ? 'compact' : 'standard',
      disabled: isDisabled,
    });

    return (
      <ReakitButton
        {...props}
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
        onClick={onPress}
      >
        {loading ? (
          <MaterialSpinner size={24} color={color} />
        ) : (
          <TextHeadline as="span" color={color}>
            {children}
          </TextHeadline>
        )}
      </ReakitButton>
    );
  }
);
