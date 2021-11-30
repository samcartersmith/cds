import { css, cx } from 'linaria';
import React, { memo } from 'react';
import { durations } from '@cbhq/cds-common/tokens/motion';
import { palette, spacing } from '../tokens';
import { Link, LinkProps } from '../typography/Link';
import { focusRing } from '../styles/focus';

type NavLinkProps = {
  active?: boolean;
} & Omit<LinkProps, 'variant' | 'color'>;

export const navLinkClassName = 'cds-nav-link';
const navLinkStyles = css`
  &.${navLinkClassName} {
    transition: border ${durations.fast3}ms ease-out;
    padding-top: ${spacing[3]};
    padding-bottom: ${spacing[3]};
    color: ${palette.foreground};
    border-bottom: 2px solid transparent;

    // hover and pressed state
    &:hover,
    &:active {
      color: ${palette.primary};
    }

    // pressed and active states
    &:active,
    &.current {
      border-bottom-color: ${palette.primary};
    }

    // Don't show hover effect if this item is currently active
    &.current:hover {
      color: ${palette.foreground};
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
