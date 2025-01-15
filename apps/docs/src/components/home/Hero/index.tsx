import React, { useCallback } from 'react';
import { useHistory } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';
import BannerArt from '@site/static/img/heroBanners/banner_art.svg';
import BannerArtDark from '@site/static/img/heroBanners/banner_art_dark.svg';
import { Button } from '@cbhq/cds-web2/buttons';

import styles from './styles.module.css';

export const Hero = () => {
  const { colorMode } = useColorMode();
  const BannerArtComponent = colorMode === 'dark' ? BannerArtDark : BannerArt;
  const history = useHistory();
  const navigateToGettingStarted = useCallback(() => {
    history.push('/getting-started/introduction');
  }, [history]);

  return (
    <section className={styles.bannerWrapper}>
      <div className={styles.bannerContentWrapper}>
        <div className={styles.bannerTextWrapper}>
          {/* use id here to give higher spcificity to the selector */}
          <h1 id={styles.bannerTitle}>Coinbase Design System</h1>
          <p className={styles.bannerDescription}>
            A global crypto design system backed by open-source code. Design and build for a
            decentralized future.
          </p>
        </div>
        <Button
          compact
          aria-label="Get started with our documentation"
          endIcon="forwardArrow"
          onClick={navigateToGettingStarted}
        >
          Get started
        </Button>
      </div>
      <div className={styles.bannerArtWrapper}>
        <BannerArtComponent className={styles.bannerArt} />
      </div>
    </section>
  );
};
