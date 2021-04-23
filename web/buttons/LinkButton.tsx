import React, { forwardRef, memo } from 'react';

import {
  useLinkButtonVariant,
  LinkButtonVariant,
} from '@cbhq/cds-common/hooks/useLinkButtonVariant';
import { cx } from 'linaria';
import { Button as ReakitButton } from 'reakit/Button';

import { ButtonProps } from '../buttons';
import { useButtonSpacing } from '../hooks/useButtonSpacing';
import * as foregroundColors from '../styles/foregroundColor';
import { Pressable } from '../system/Pressable';
import { TextHeadline } from '../typography/TextHeadline';
import * as buttonStyles from './buttonStyles';

export interface LinkButtonProps extends Omit<ButtonProps, 'variant' | 'loading'> {
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: LinkButtonVariant;
}

export const LinkButton = memo(
  forwardRef(
    (
      {
        accessibilityLabel,
        block,
        children,
        compact,
        disabled,
        onPress,
        testID,
        type = 'button',
        variant = 'primary',
        ...props
      }: LinkButtonProps,
      ref: React.Ref<HTMLButtonElement>
    ) => {
      const spacingClass = useButtonSpacing(compact);
      const { color, backgroundColor, borderColor } = useLinkButtonVariant(variant);

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
            foregroundColors[variant],
            buttonStyles.button,
            compact && buttonStyles.buttonCompact,
            block && buttonStyles.buttonBlock,
            spacingClass
          )}
          disabled={disabled}
          onPress={onPress}
          type={type}
          ref={ref}
        >
          <TextHeadline as="span" color={color}>
            {children}
          </TextHeadline>
        </Pressable>
      );
    }
  )
);

LinkButton.displayName = 'LinkButton';
