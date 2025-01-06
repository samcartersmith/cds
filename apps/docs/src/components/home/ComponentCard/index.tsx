import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './styles.module.css';

export interface ComponentCardProps {
  name: string;
  count: number;
  bannerLightSrc: string;
  bannerLightOverlaySrc: string;
  bannerDarkSrc: string;
  bannerDarkOverlaySrc: string;
  to: string;
}

export const ComponentCard = ({
  name,
  count,
  bannerDarkSrc,
  bannerLightSrc,
  bannerDarkOverlaySrc,
  bannerLightOverlaySrc,
  to,
}: ComponentCardProps) => {
  const { colorMode } = useColorMode();
  const bannerSrc = colorMode === 'dark' ? bannerDarkSrc : bannerLightSrc;
  const bannerOverlaySrc = colorMode === 'dark' ? bannerDarkOverlaySrc : bannerLightOverlaySrc;
  return (
    <Link role="button" className={styles.cardWrapper} to={to}>
      {/* use background image here to stack images without using absolute position */}
      <div className={styles.cardBannerArt} style={{ backgroundImage: `url(${bannerSrc})` }}>
        <img className={styles.cardBannerArtOverlay} src={bannerOverlaySrc} />
      </div>
      <div className={styles.cardContentWrapper}>
        <h3 className={styles.componentName}>{name}</h3>
        <div className={styles.componentCount}>{count}</div>
      </div>
    </Link>
  );
};
