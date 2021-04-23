import React, { forwardRef } from 'react';

import { ButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { cx } from 'linaria';
import { ButtonProps as ReakitButtonProps, Button as ReakitButton } from 'reakit/Button';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { MaterialSpinner } from '../loaders/MaterialSpinner';
import * as foregroundColors from '../styles/foregroundColor';
import { Pressable, PressableProps } from '../system/Pressable';
import { TextHeadline } from '../typography/TextHeadline';
import * as buttonStyles from './buttonStyles';

export interface ButtonProps
  extends ButtonBaseProps,
    PressableProps,
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

export const Button = forwardRef(function Button(
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
) {
  const spacingClass = useButtonSpacing(compact);
  const { color, backgroundColor, borderColor } = useButtonVariant(variant);

  return (
    <Pressable
      aria-label={accessibilityLabel}
      data-test-id={testID}
      {...props}
      as={ReakitButton}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius={compact ? 'compact' : 'standard'}
      borderWidth="button"
      className={cx(
        foregroundColors[color],
        buttonStyles.button,
        compact && buttonStyles.buttonCompact,
        block && buttonStyles.buttonBlock,
        spacingClass
      )}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      type={type}
      ref={ref}
    >
      {loading ? (
        <MaterialSpinner size={24} color={color} />
      ) : (
        <TextHeadline as="span" color={color}>
          {children}
        </TextHeadline>
      )}
    </Pressable>
  );
});
