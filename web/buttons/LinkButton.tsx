import React, { forwardRef, memo } from 'react';

import {
  useLinkButtonVariant,
  LinkButtonVariant,
} from '@cbhq/cds-common/hooks/useLinkButtonVariant';
import { cx } from 'linaria';
import { Button as ReakitButton } from 'reakit/Button';

import { ButtonProps } from '../buttons';
import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { Icon } from '../icons/Icon';
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
        endIcon,
        onPress,
        startIcon,
        testID,
        type = 'button',
        variant = 'primary',
        ...props
      }: LinkButtonProps,
      ref: React.Ref<HTMLButtonElement>
    ) => {
      const spacingClass = useButtonSpacing(compact);
      const { color, backgroundColor } = useLinkButtonVariant(variant);

      return (
        <Pressable
          aria-label={accessibilityLabel}
          data-test-id={testID}
          {...props}
          transparentWhileInactive
          as={ReakitButton}
          backgroundColor={backgroundColor}
          borderColor="transparent"
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
          {startIcon && (
            <span className={buttonStyles.startIcon}>
              <Icon name={startIcon} size={compact ? 'xs' : 's'} color={color} />
            </span>
          )}
          <TextHeadline as="span" color={color}>
            {children}
          </TextHeadline>

          {endIcon && (
            <span className={buttonStyles.endIcon}>
              <Icon name={endIcon} size={compact ? 'xs' : 's'} color={color} />
            </span>
          )}
        </Pressable>
      );
    }
  )
);

LinkButton.displayName = 'LinkButton';
