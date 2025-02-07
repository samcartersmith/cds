import React from 'react';
import type { Props as DocusaurusLinkProps } from '@docusaurus/Link';
import Link from '@docusaurus/Link';
import { isRegexpStringMatch } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type { Props } from '@theme/NavbarItem/NavbarNavLink';
import { type Location } from 'history';
import { HStack } from '@cbhq/cds-web2/layout';
import { Pressable } from '@cbhq/cds-web2/system/Pressable';
import { Text } from '@cbhq/cds-web2/typography/Text';

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
  html,
  prependBaseUrlToHref,
  ...props
}: NavbarNavLinkProps): JSX.Element {
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  if (href) {
    return (
      <Pressable
        noScaleOnPress
        as={Link}
        background="bgSecondary"
        className={styles.link}
        href={prependBaseUrlToHref ? normalizedHref : href}
      >
        <Text font="headline">{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      isNavLink
      noScaleOnPress
      as={Link}
      background="bgSecondary"
      className={styles.link}
      to={toUrl}
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_: unknown, location: Location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      {...props}
    >
      <HStack alignItems="stretch" paddingX={2} paddingY={1}>
        <Text font="headline">{label}</Text>
      </HStack>
    </Pressable>
  );
}
