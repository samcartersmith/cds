import React, { memo, useMemo } from 'react';
import { ButtonBaseProps, SharedProps } from '@cbhq/cds-common';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';

import { Avatar } from '../media';
import { getFlexStyles } from '../styles/flex';
import { PressableOpacity, PressableProps } from '../system';
import { cx } from '../utils/linaria';

import { avatarButton } from './buttonStyles';

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
