import { css, cx } from 'linaria';
import React, { memo } from 'react';
import { durations } from '@cbhq/cds-common/tokens/motion';
import { palette, spacing } from '../tokens';
import { Link, LinkProps } from '../typography/Link';

type NavLinkProps = {
  active?: boolean;
} & Omit<LinkProps, 'variant' | 'color'>;

export const navLinkClassName = 'cds-nav-link';
const navLinkStyles = css`
  &.${navLinkClassName} {
    transition: border ${durations.fast3}ms ease-out;
    border-bottom: 2px solid transparent;
    padding-top: ${spacing[3]};
    padding-bottom: ${spacing[3]};

    &:hover {
      border-bottom-color: ${palette.foreground};
    }

    &.active,
    &.active:hover {
      border-bottom-color: ${palette.primary};
    }
  }
`;

export const NavLink = memo(({ active, ...rest }: NavLinkProps) => {
  const className = cx(navLinkClassName, navLinkStyles, active && 'active');

  return <Link variant="label1" color="foreground" dangerouslySetClassName={className} {...rest} />;
});
