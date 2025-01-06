import styles from './styles.module.css';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';

export interface QuickStartLinkProps {
  title: string;
  description: string;
  link: { label: string; to: string } | { label: string; href: string };
  BannerComponentLight: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  BannerComponentDark: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const QuickStartCampaignCard = ({
  title,
  description,
  link,
  BannerComponentLight,
  BannerComponentDark,
}: QuickStartLinkProps) => {
  const { colorMode } = useColorMode();
  const BannerComponent = colorMode === 'dark' ? BannerComponentDark : BannerComponentLight;

  return (
    <div className={styles.cardWrapper}>
      <hr className={styles.cardDivider} />
      <div className={styles.cardMainWrapper}>
        <div className={styles.cardContentWrapper}>
          <div className={styles.cardTextWrapper}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
          </div>
          <Link
            {...('to' in link ? { to: link.to } : { href: link.href })}
            className={styles.cardLink}
          >
            {link.label}
          </Link>
        </div>
        <div className={styles.bannerArtWrapper}>
          <BannerComponent width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};
