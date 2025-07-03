import React, { useMemo } from 'react';
import { processAdmonitionProps } from '@docusaurus/theme-common';
import type { Props } from '@theme/Admonition';
import { Banner, BannerProps } from '@cbhq/cds-web/banner/Banner';

import styles from './styles.module.css';

export default function Admonition(unprocessedProps: Props): React.ReactNode {
  const props = processAdmonitionProps(unprocessedProps);
  const { title, children, type } = props;
  const bannerProps: Pick<BannerProps, 'variant' | 'title' | 'children' | 'startIcon'> =
    useMemo(() => {
      switch (type) {
        case 'warning':
          return { variant: 'warning', title: title ?? 'Warning', children, startIcon: 'warning' };
        case 'danger':
          return { variant: 'error', title: title ?? 'Danger', children, startIcon: 'error' };
        case 'tip':
          return { variant: 'promotional', title: title ?? 'Tip', children, startIcon: 'info' };
        case 'note':
          return { variant: 'informational', title: title ?? 'Note', children, startIcon: 'info' };
        default:
          return { variant: 'informational', title: title ?? 'Note', children, startIcon: 'info' };
      }
    }, [title, children, type]);
  return <Banner className={styles.docsAdmonition} minWidth={0} {...bannerProps} />;
}
