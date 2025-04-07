import React from 'react';
import type { Props as DocusaurusLinkProps } from '@docusaurus/Link';
import Link from '@docusaurus/Link';
import { isRegexpStringMatch } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { cx } from '@linaria/core';
import type { Props } from '@theme/NavbarItem/NavbarNavLink';
import { type Location } from 'history';
import { Box } from '@cbhq/cds-web2/layout';
import { Pressable } from '@cbhq/cds-web2/system/Pressable';

import styles from './styles.module.css';

export type NavbarNavLinkProps = Pick<
  Props,
  'activeBasePath' | 'activeBaseRegex' | 'label' | 'html' | 'prependBaseUrlToHref'
> &
  Omit<DocusaurusLinkProps, 'ref' | 'color'>;

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  prependBaseUrlToHref,
  className,
  ...props
}: NavbarNavLinkProps): JSX.Element {
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  if (href) {
    return (
      <Pressable
        alignItems="center"
        as={Link}
        background="bgSecondary"
        borderRadius={1000}
        borderWidth={0}
        className={cx(styles.navLink, className)}
        color="fg"
        font="headline"
        href={prependBaseUrlToHref ? normalizedHref : href}
        {...props}
      >
        <Box as="span" paddingX={1.5} paddingY={0.5}>
          {label}
        </Box>
      </Pressable>
    );
  }

  return (
    <Pressable
      bordered
      isNavLink
      as={Link}
      background="bgSecondary"
      borderRadius={1000}
      borderWidth={0}
      className={cx(styles.navLink, className)}
      to={toUrl}
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_: unknown, location: Location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      {...props}
    >
      <Box as="span" paddingX={1.5} paddingY={0.5}>
        {label}
      </Box>
    </Pressable>
  );
}
