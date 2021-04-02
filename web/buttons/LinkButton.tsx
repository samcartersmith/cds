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
import { TextHeadline } from '../typography/TextHeadline';
import * as buttonStyles from './buttonStyles';
import { useInteractable } from './useInteractable';

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

      const { className, style } = useInteractable({
        backgroundColor,
        borderColor,
        borderRadius: compact ? 'compact' : 'standard',
        disabled,
      });

      return (
        <ReakitButton
          {...props}
          aria-label={accessibilityLabel}
          data-test-id={testID}
          className={cx(
            className,
            foregroundColors[variant],
            buttonStyles.button,
            compact && buttonStyles.buttonCompact,
            block && buttonStyles.buttonBlock,
            spacingClass
          )}
          disabled={disabled}
          ref={ref}
          style={style}
          type={type}
          onClick={onPress}
        >
          <TextHeadline as="span" color={color}>
            {children}
          </TextHeadline>
        </ReakitButton>
      );
    }
  )
);

LinkButton.displayName = 'LinkButton';
