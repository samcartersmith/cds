import React, { forwardRef } from 'react';

import { Button } from 'reakit/Button';

type Props = React.AllHTMLAttributes<HTMLElement> & { to?: string };

export const ButtonOrLink = forwardRef<HTMLElement, Props>(
  ({ to, href, rel, target, type = 'button', ...props }, ref) => {
    if (to || href) {
      return (
        <Button
          {...props}
          as="a"
          href={to || href}
          rel={!rel && target === '_blank' ? 'noopener noreferrer' : rel}
          target={target}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        />
      );
    }

    return (
      <Button
        {...props}
        as="button"
        type={type as 'button'}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
      />
    );
  },
);

ButtonOrLink.displayName = 'ButtonOrLink';
