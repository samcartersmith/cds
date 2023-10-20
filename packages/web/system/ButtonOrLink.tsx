import React, { forwardRef } from 'react';
import { Button } from 'reakit';

type Props = React.AllHTMLAttributes<HTMLElement> & { to?: string };

export const ButtonOrLink = forwardRef<HTMLElement, Props>(
  ({ to, href, rel, target, type = 'button', ...props }, ref) => {
    if (to || href) {
      return (
        <Button
          {...props}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          as="a"
          href={to ?? href}
          rel={!rel && target === '_blank' ? 'noopener noreferrer' : rel}
          target={target}
        />
      );
    }

    return (
      <Button
        {...props}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        as="button"
        type={type as 'button'}
      />
    );
  },
);

ButtonOrLink.displayName = 'ButtonOrLink';
