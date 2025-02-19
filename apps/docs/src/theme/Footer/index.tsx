import React from 'react';
import { FooterLinkItem, useColorMode, useThemeConfig } from '@docusaurus/theme-common';
import { cx } from '@linaria/core';
import CDSLogo from '@site/static/img/logos/cds_logo.svg';
import CDSLogoDark from '@site/static/img/logos/cds_logo_dark.svg';

import styles from './styles.module.css';

export default function Footer(): JSX.Element | null {
  const { footer } = useThemeConfig();
  const { colorMode } = useColorMode();
  const LogoComponent = colorMode === 'light' ? CDSLogo : CDSLogoDark;

  if (!footer) {
    return null;
  }
  const { links } = footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogoWrapper}>
        <LogoComponent className={styles.footerLogo} />
      </div>
      <div className={styles.footerContent}>
        <p className={cx(styles.footerText, 'body-text')}>
          Coinbase Design is an open-source, adaptable system of guidelines, components, and tools
          that aid the best practices of user interface design for crypto products.
        </p>
        <div className={styles.footerLinksWrapper}>
          {(links as FooterLinkItem[]).map(({ label, href }) => (
            <a
              key={label}
              className={cx('headline-text', styles.footerLink)}
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
