import React, { forwardRef, useMemo } from 'react';

import { IconButtonBaseProps, SharedProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { cx } from 'linaria';

import * as buttonStyles from '../buttons/buttonStyles';
import { Icon } from '../icons/Icon';
import { getFlexStyles } from '../styles/flex';
import { Pressable, PressableProps } from '../system/Pressable';

export interface IconButtonProps extends IconButtonBaseProps, PressableProps, SharedProps {
  as?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  /** URL that this button links to when pressed. */
  to?: string;
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
      to,
      transparent,
      variant = 'secondary',
    }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const flexStyles = getFlexStyles({
      alignItems: 'center',
      justifyContent: 'center',
    });
    const height = useInteractableHeight(true);
    const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
    const style = useMemo(() => ({ '--interactable-height': `${height}px` }), [height]);

    return (
      <Pressable
        aria-label={accessibilityLabel}
        testID={testID}
        as={as}
        transparentWhileInactive={transparent}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius="round"
        borderWidth="button"
        className={cx(flexStyles, buttonStyles.iconButton)}
        disabled={disabled}
        onPress={onPress}
        style={style}
        ref={ref}
        href={to}
      >
        <Icon name={name} size="s" color={color} />
      </Pressable>
    );
  }
);
