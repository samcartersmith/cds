import React, { useRef } from 'react';

import { ButtonBaseProps } from '@cbhq/cds-common';
import { AriaButtonProps } from '@react-types/button';
import { cx } from 'linaria';
import { useButton } from 'react-aria';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Interactable } from '../Interactable/Interactable';
import { TextHeadline } from '../Text/Text';
import { PressEvents } from '../types';
import * as buttonStyles from './buttonStyles';

export interface ButtonProps
  extends ButtonBaseProps,
    PressEvents<HTMLButtonElement>,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'children' | 'className' | 'onClick' | 'onClickCapture' | 'style'
    > {}

export const Button = ({
  block,
  children,
  compact,
  disabled,
  loading,
  type,
  variant = 'primary',
  // Aria
  onPress,
  onPressStart,
  onPressEnd,
  onPressChange,
  onPressUp,
  ...restProps
}: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const spacingClass = useSpacingStyles({
    horizontal: compact ? 2 : 3,
    vertical: compact ? 0.5 : 1,
  });
  const { buttonProps, isPressed } = useButton(
    {
      children,
      isDisabled: disabled || loading,
      onPress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
      type,
    } as AriaButtonProps,
    ref
  );
  const borderRadius = buttonStyles[compact ? 'radiusCompact' : 'radius'];

  return (
    <Interactable
      scaleOnPress
      block={block}
      disabled={disabled || loading}
      overlayColor={variant}
      pressedOverride={isPressed}
      underlayClassName={borderRadius}
    >
      <button
        {...restProps}
        {...buttonProps}
        aria-pressed={isPressed}
        className={cx(
          buttonStyles.button,
          buttonStyles[variant],
          borderRadius,
          compact && buttonStyles.buttonCompact,
          compact && variant === 'primary' && buttonStyles.primaryCompact,
          block && buttonStyles.buttonBlock,
          spacingClass
        )}
        ref={ref}
      >
        <TextHeadline as="span" color="currentColor">
          {children}
        </TextHeadline>
      </button>
    </Interactable>
  );
};
