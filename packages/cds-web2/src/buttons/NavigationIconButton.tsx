import React, { forwardRef, memo, useCallback, useState } from 'react';
import { css, cx } from '@linaria/core';
import { variants } from '@cbhq/cds-common2/tokens/button';
import type { IconButtonVariant, NavigationIconName } from '@cbhq/cds-common2/types';

import { NavigationIcon } from '../icons/NavigationIcon';
import { Pressable } from '../system/Pressable';

import { type IconButtonDefaultElement, IconButtonProps } from './IconButton';

type NavigationButtonProps = {
  active?: boolean;
  name: NavigationIconName;
  variant?: IconButtonVariant;
} & Omit<IconButtonProps<IconButtonDefaultElement>, 'name' | 'variant' | 'transparent'>;

const baseStyle = css`
  min-width: unset;
`;

const focusStyle = css`
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 2px solid var(--color-bgPrimary);
    border-radius: inherit;
  }
`;

export const NavigationIconButton = memo(
  forwardRef(function NavigationIconButton(
    {
      active,
      as,
      alignItems = 'center',
      color,
      compact = true,
      disabled = false,
      height = compact ? 40 : 56,
      width = compact ? 40 : 56,
      justifyContent = 'center',
      name,
      onClick,
      variant = 'secondary',
      ...props
    }: NavigationButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) {
    const [isActive, setIsActive] = useState(active);
    const iconSize = compact ? 's' : 'm';
    const { background, borderColor } = variants[variant];

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsActive(true);
        onClick?.(event);
      },
      [onClick],
    );

    const handleBlur = useCallback(() => setIsActive(false), []);

    return (
      <Pressable
        ref={ref}
        noScaleOnPress
        alignItems={alignItems}
        as={as}
        background={background}
        borderColor={borderColor}
        borderRadius={1000}
        borderWidth={100}
        className={cx(baseStyle, isActive && focusStyle)}
        color={color}
        disabled={disabled}
        height={height}
        justifyContent={justifyContent}
        onBlur={handleBlur}
        onClick={handleClick}
        width={width}
        {...props}
      >
        <NavigationIcon name={name} size={iconSize} />
      </Pressable>
    );
  }),
);
