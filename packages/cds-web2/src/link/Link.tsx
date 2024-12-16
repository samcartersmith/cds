import React, { ForwardedRef, forwardRef, memo } from 'react';
import { css, cx } from '@linaria/core';

import { type BoxProps, Box } from '../layout/Box';

export type LinkBaseProps = {
  disabled?: boolean;
  to?: string;
};

export type LinkProps = LinkBaseProps & BoxProps<'a'>;

const disabledStyle = css`
  pointer-events: none;
`;

export const Link = memo(
  forwardRef(function Link(
    {
      to,
      href,
      className,
      disabled,
      display = 'inline-flex',
      color = 'textPrimary',
      font = 'body',
      ...props
    }: LinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) {
    return (
      <Box
        ref={ref}
        aria-disabled={disabled ? true : undefined}
        as="a"
        className={cx(disabled && disabledStyle, className)}
        color={color}
        display={display}
        font={font}
        href={to ?? href}
        {...props}
      />
    );
  }),
);
