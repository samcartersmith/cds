import React, { forwardRef, memo, useMemo } from 'react';
import { css } from '@linaria/core';
import type { ButtonBaseProps, SharedProps } from '@cbhq/cds-common2';
import { interactableHeight } from '@cbhq/cds-common2/tokens/interactableHeight';
import type { AvatarBaseProps } from '@cbhq/cds-common2/types/AvatarBaseProps';

import { type AvatarWebProps, Avatar } from '../media';
import { type PressableProps, Pressable } from '../system';

export type AvatarButtonProps = {
  as?: React.ComponentType<React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>>;
} & PressableProps &
  SharedProps &
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'className' | 'style' | 'dangerouslySetInnerHTML'> &
  Pick<ButtonBaseProps, 'accessibilityLabel' | 'compact'> &
  Pick<AvatarBaseProps, 'alt' | 'src' | 'colorScheme' | 'shape' | 'borderColor' | 'name'> &
  Pick<AvatarWebProps, 'selected'>;

const baseStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--interactable-height);
  height: var(--interactable-height);
  min-width: unset;
`;

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
      ref: React.ForwardedRef<HTMLElement>,
    ) => {
      const height = compact ? interactableHeight.compact : interactableHeight.regular;
      const styles = useMemo(
        () => ({ '--interactable-height': `${height}px` } as React.CSSProperties),
        [height],
      );

      return (
        <Pressable
          aria-label={accessibilityLabel}
          background="transparent"
          {...props}
          ref={ref}
          as={as}
          className={baseStyles}
          onPress={onPress}
          style={styles}
          to={to}
        >
          <Avatar
            alt={alt}
            colorScheme={colorScheme}
            dangerouslySetSize={height}
            name={name}
            selected={selected}
            shape={shape}
            src={src}
          />
        </Pressable>
      );
    },
  ),
);
