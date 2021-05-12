import React, { forwardRef } from 'react';

import { IconButtonBaseProps, SharedProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { cx } from 'linaria';
import { Button as ReakitButton } from 'reakit/Button';

import * as buttonStyles from '../buttons/buttonStyles';
import { Icon } from '../icons/Icon';
import { getFlexStyles } from '../styles/flex';
import { Pressable, PressableProps } from '../system/Pressable';

export interface IconButtonProps extends IconButtonBaseProps, PressableProps, SharedProps {
  as?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
}

export const IconButton = forwardRef(
  (
    {
      accessibilityLabel,
      as,
      disabled = false,
      name,
      onPress,
      testID,
      transparent,
      variant = 'secondary',
    }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const flexStyles = getFlexStyles({
      alignItems: 'center',
      justifyContent: 'center',
    });
    const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);

    return (
      <Pressable
        aria-label={accessibilityLabel}
        testID={testID}
        as={as || ReakitButton}
        transparentWhileInactive={transparent}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius="round"
        borderWidth="button"
        className={cx(flexStyles, buttonStyles.iconButton)}
        disabled={disabled}
        onPress={onPress}
        ref={ref}
      >
        <Icon name={name} size="s" color={color} />
      </Pressable>
    );
  }
);
