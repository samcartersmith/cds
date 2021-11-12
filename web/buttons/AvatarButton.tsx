import React, { memo, useMemo } from 'react';
import { cx } from 'linaria';
import { ButtonBaseProps, SharedProps } from '@cbhq/cds-common';
import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { avatarButton } from './buttonStyles';
import { PressableOpacity, PressableProps } from '../system';
import { getFlexStyles } from '../styles/flex';
import { Avatar } from '../media';

type AvatarButtonProps = {
  as?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
} & PressableProps &
  SharedProps &
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'className' | 'style' | 'dangerouslySetInnerHTML'> &
  Pick<ButtonBaseProps, 'accessibilityLabel' | 'compact'> &
  Pick<AvatarBaseProps, 'alt' | 'src'>;

export const AvatarButton = memo(
  ({ accessibilityLabel, as, onPress, to, alt, src, compact, ...props }: AvatarButtonProps) => {
    const flexStyles = getFlexStyles({
      alignItems: 'center',
      justifyContent: 'center',
    });

    const height = useInteractableHeight(compact);
    const style = useMemo(() => ({ '--interactable-height': `${height}px` }), [height]);

    return (
      <PressableOpacity
        aria-label={accessibilityLabel}
        {...props}
        as={as}
        className={cx(flexStyles, avatarButton)}
        onPress={onPress}
        style={style}
        to={to}
      >
        <Avatar src={src} alt={alt} dangerouslySetSize={height} />
      </PressableOpacity>
    );
  },
);
