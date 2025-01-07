import React from 'react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { cx } from '@linaria/core';
import type { Props } from '@theme/DocSidebarItem/Html';

import styles from './styles.module.css';

export default function DocSidebarItemHtml({ item, level, index }: Props): JSX.Element {
  const { value, defaultStyle, className } = item;
  return (
    <li
      // eslint-disable-next-line react/no-danger, react-perf/jsx-no-new-object-as-prop
      dangerouslySetInnerHTML={{ __html: value }}
      key={index}
      className={cx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        defaultStyle && styles.menuHtmlItem,
        defaultStyle && 'menu__list-item',
        className,
      )}
    />
  );
}
