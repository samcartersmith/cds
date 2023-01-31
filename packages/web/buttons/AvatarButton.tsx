import React, { forwardRef, memo, useMemo } from 'react';
import { ButtonBaseProps, ForwardedRef, SharedProps } from '@cbhq/cds-common';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';

import { getFlexStyles } from '../layout/getFlexStyles';
import { Avatar, AvatarWebProps } from '../media';
import { PressableOpacity, PressableProps } from '../system';
import { cx } from '../utils/linaria';

import { avatarButton } from './buttonStyles';

export type AvatarButtonProps = {
  as?: React.ComponentType<React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>>;
} & PressableProps &
  SharedProps &
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'className' | 'style' | 'dangerouslySetInnerHTML'> &
  Pick<ButtonBaseProps, 'accessibilityLabel' | 'compact'> &
  Pick<AvatarBaseProps, 'alt' | 'src' | 'colorScheme' | 'shape' | 'borderColor' | 'name'> &
  Pick<AvatarWebProps, 'selected'>;

export const AvatarButton = memo(
  forwardRef(
    (
      {
        accessibilityLabel,
        as,
        onPress,
        to,
        alt,
        src,
        compact,
        colorScheme,
        shape,
        selected,
        name,
        ...props
      }: AvatarButtonProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
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
          ref={ref}
        >
          <Avatar
            src={src}
            alt={alt}
            dangerouslySetSize={height}
            colorScheme={colorScheme}
            shape={shape}
            selected={selected}
            name={name}
          />
        </PressableOpacity>
      );
    },
  ),
);
