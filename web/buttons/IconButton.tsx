import React, { forwardRef, useMemo } from 'react';

import { IconButtonBaseProps, SharedProps } from '@cbhq/cds-common';
import { useButtonIconSize } from '@cbhq/cds-common/hooks/useButtonIconSize';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { cx } from 'linaria';

import { iconButton } from './buttonStyles';
import { Icon } from '../icons/Icon';
import { getFlexStyles } from '../styles/flex';
import { Pressable, PressableProps } from '../system/Pressable';
import { useFeatureFlag } from '../system/useFeatureFlag';

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
      compact = true,
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
    const height = useInteractableHeight(compact);
    const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
    const style = useMemo(() => ({ '--interactable-height': `${height}px` }), [height]);
    const hasFrontier = useFeatureFlag('frontierButton');
    const iconSize = useButtonIconSize(compact);

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
        <Icon name={name} size={hasFrontier ? iconSize : 's'} color={color} />
      </Pressable>
    );
  },
);
