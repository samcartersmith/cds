import React, { forwardRef, useMemo } from 'react';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { cx } from 'linaria';
import { ButtonBaseProps, SharedProps } from '@cbhq/cds-common';
import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { avatarButton } from './buttonStyles';
import { Pressable, PressableProps } from '../system';
import { getFlexStyles } from '../styles/flex';
import { Avatar } from '../media/avatar/Avatar';

type AvatarButtonProps = {
  as?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
} & PressableProps &
  SharedProps &
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'className' | 'style' | 'dangerouslySetInnerHTML'> &
  Pick<ButtonBaseProps, 'accessibilityLabel' | 'disabled' | 'compact'> &
  Pick<AvatarBaseProps, 'alt' | 'src'>;

export const AvatarButton = forwardRef(
  (
    {
      accessibilityLabel,
      as,
      disabled = false,
      onPress,
      to,
      alt,
      src,
      compact,
      ...props
    }: AvatarButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const flexStyles = getFlexStyles({
      alignItems: 'center',
      justifyContent: 'center',
    });

    const height = useInteractableHeight(compact);
    const { backgroundColor, borderColor } = useButtonVariant('foregroundMuted', true);
    const style = useMemo(() => ({ '--interactable-height': `${height}px` }), [height]);

    return (
      <Pressable
        aria-label={accessibilityLabel}
        {...props}
        as={as}
        transparentWhileInactive
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius="round"
        borderWidth="button"
        className={cx(flexStyles, avatarButton)}
        disabled={disabled}
        onPress={onPress}
        style={style}
        ref={ref}
        to={to}
      >
        <Avatar src={src} alt={alt} dangerouslySetSize={height} />
      </Pressable>
    );
  },
);
