import React from 'react';
import Link from '@docusaurus/Link';
import { isRegexpStringMatch } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { cx } from '@linaria/core';
import type { Props } from '@theme/NavbarItem/NavbarNavLink';
import { HStack } from '@cbhq/cds-web2/layout';
import { alignItems, display, paddingX, paddingY } from '@cbhq/cds-web2/styles/styles';
import { Pressable } from '@cbhq/cds-web2/system/Pressable';
import { Text } from '@cbhq/cds-web2/text/Text';

import styles from './styles.module.css';

const linkClassName = cx(paddingX[2], paddingY[1], styles.link, display.flex, alignItems.center);

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  prependBaseUrlToHref,
  ...props
}: Props): JSX.Element {
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  if (href) {
    return (
      <Pressable
        noScaleOnPress
        as={Link}
        background="backgroundSecondary"
        className={linkClassName}
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
      background="backgroundSecondary"
      className={linkClassName}
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
