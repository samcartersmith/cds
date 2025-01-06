import styles from './styles.module.css';
import BannerArt from '@site/static/img/heroBanners/banner_art.svg';
import BannerArtDark from '@site/static/img/heroBanners/banner_art_dark.svg';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';

export const Hero = () => {
  const { colorMode } = useColorMode();
  const BannerArtComponent = colorMode === 'dark' ? BannerArtDark : BannerArt;

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
        <Link to="/getting-started/introduction">Get Started</Link>
      </div>
      <div className={styles.bannerArtWrapper}>
        <BannerArtComponent className={styles.bannerArt} />
      </div>
    </section>
  );
};
