import React, { memo } from 'react';
import { css, cx } from '@linaria/core';

import { type LinkDefaultElement, type LinkProps, Link } from '../typography/Link';

export type NavLinkProps = {
  /** Boolean to indicate if the Link represents the current route. */
  active?: boolean;
} & Omit<LinkProps<LinkDefaultElement>, 'color'>;

const navLinkStyles = css`
  padding-top: var(--space-3);
  padding-bottom: var(--space-3);
  color: var(--color-fg);
  border-bottom: 2px solid var(--color-transparent);

  /* Hover and pressed state */
  &:hover,
  &:active {
    color: var(--color-fgPrimary);
  }

  /* Pressed state */
  &:active {
    opacity: 0.86;
  }

  /* Current state */
  &[data-active='true'] {
    border-bottom-color: var(--color-fgPrimary);

    /* Do not show hover effect if this item is currently active */
    &:hover {
      color: var(--color-fg);
    }
  }
`;

export const NavLink = memo(({ active, className: customClassName, ...rest }: NavLinkProps) => {
  return (
    <Link
      className={cx(navLinkStyles, customClassName)}
      color="currentColor"
      data-active={active}
      font="label1"
      tabIndex={0}
      underline={false}
      {...rest}
    />
  );
});
