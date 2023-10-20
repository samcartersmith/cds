import React, { memo } from 'react';
import { Link as CDSLink, LinkProps } from '@cbhq/cds-web/typography';

export type LinkFields = {
  label: string;
  url: string;
} & Omit<LinkProps, 'children'>;

export const Link = memo(function Link({ label, url, ...rest }: LinkFields) {
  return (
    <CDSLink openInNewWindow to={url} {...rest}>
      {label}
    </CDSLink>
  );
});
