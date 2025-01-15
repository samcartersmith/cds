import React, { useCallback } from 'react';
import { useHistory } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';
import { Button } from '@cbhq/cds-web2/buttons';

import styles from './styles.module.css';

export type QuickStartLinkProps = {
  title: string;
  description: string;
  link: { label: string; to: string } | { label: string; href: string };
  BannerComponentLight: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  BannerComponentDark: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const QuickStartCampaignCard = ({
  title,
  description,
  link,
  BannerComponentLight,
  BannerComponentDark,
}: QuickStartLinkProps) => {
  const { colorMode } = useColorMode();
  const BannerComponent = colorMode === 'dark' ? BannerComponentDark : BannerComponentLight;
  const history = useHistory();
  const navigate = useCallback(() => {
    history.push('to' in link ? link.to : link.href);
  }, [history, link]);

  return (
    <div className={styles.cardWrapper}>
      <hr className={styles.cardDivider} />
      <div className={styles.cardMainWrapper}>
        <div className={styles.cardContentWrapper}>
          <div className={styles.cardTextWrapper}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
          </div>
          <Button
            compact
            transparent
            alignSelf="start"
            aria-label={`Navigate to ${link.label}`}
            endIcon="forwardArrow"
            flush="start"
            onClick={navigate}
            variant="primary"
          >
            {link.label}
          </Button>
        </div>
        <div className={styles.bannerArtWrapper}>
          <BannerComponent height="100%" width="100%" />
        </div>
      </div>
    </div>
  );
};
