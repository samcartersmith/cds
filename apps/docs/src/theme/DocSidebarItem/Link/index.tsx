import React from 'react';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';
import { isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { cx } from '@linaria/core';
import type { Props } from '@theme/DocSidebarItem/Link';
import IconExternalLink from '@theme/Icon/ExternalLink';
import { Text } from '@cbhq/cds-web2/typography/Text';

import styles from './styles.module.css';

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): JSX.Element {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  return (
    <li
      key={label}
      className={cx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
    >
      <Link
        aria-current={isActive ? 'page' : undefined}
        autoAddBaseUrl={autoAddBaseUrl}
        className={cx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          isActive && 'menu__link--active',
        )}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}
      >
        <Text
          color={isActive ? 'textPrimary' : 'textForeground'}
          font={isActive ? 'label1' : 'label2'}
        >
          {label}
        </Text>
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
