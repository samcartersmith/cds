import { css, cx } from 'linaria';
import React, { memo } from 'react';
import { opacityPressed } from '@cbhq/cds-common/tokens/interactable';
import { palette, spacing } from '../tokens';
import { Link, LinkProps, linkContainerClassName } from '../typography/Link';
import { focusRing } from '../styles/focus';

type NavLinkProps = {
  active?: boolean;
} & Omit<LinkProps, 'variant' | 'color'>;

export const navLinkClassName = 'cds-nav-link';
const navLinkStyles = css`
  &.${navLinkClassName} {
    padding-top: ${spacing[3]};
    padding-bottom: ${spacing[3]};
    color: ${palette.foreground};
    border-bottom: 2px solid transparent;

    // Disable default transitions from Link
    .${linkContainerClassName} {
      transition: color 0ms;
    }

    // Hover and pressed state
    &:hover,
    &:active {
      color: ${palette.primary};
    }

    // Pressed state
    &:active {
      opacity: ${opacityPressed[60]};
    }

    // Current state
    &.current {
      border-bottom-color: ${palette.primary};

      // Don't show hover effect if this item is currently active
      &:hover {
        color: ${palette.foreground};
      }
    }
  }
`;

export const NavLink = memo(({ active, dangerouslySetClassName, ...rest }: NavLinkProps) => {
  const className = cx(navLinkClassName, navLinkStyles, focusRing, active && 'current');

  return (
    <Link
      variant="label1"
      color="currentColor"
      dangerouslySetClassName={cx(className, dangerouslySetClassName)}
      {...rest}
    />
  );
});
