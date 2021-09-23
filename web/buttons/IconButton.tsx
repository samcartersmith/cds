import React, { forwardRef, useMemo } from 'react';

import { IconButtonBaseProps, SharedProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { cx } from 'linaria';

import { iconButton } from './buttonStyles';
import { Icon } from '../icons/Icon';
import { getFlexStyles } from '../styles/flex';
import { Pressable, PressableProps } from '../system/Pressable';

export type IconButtonProps = {
  as?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
} & IconButtonBaseProps &
  PressableProps &
  SharedProps &
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'className' | 'style' | 'dangerouslySetInnerHTML'>;

export const IconButton = forwardRef(
  (
    {
      accessibilityLabel,
      as,
      disabled = false,
      name,
      onPress,
      to,
      transparent,
      variant = 'secondary',
      ...props
    }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>,
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
        {...props}
        as={as}
        transparentWhileInactive={transparent}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius="round"
        borderWidth="button"
        className={cx(flexStyles, iconButton)}
        disabled={disabled}
        onPress={onPress}
        style={style}
        ref={ref}
        to={to}
      >
        <Icon name={name} size="s" color={color} />
      </Pressable>
    );
  },
);
