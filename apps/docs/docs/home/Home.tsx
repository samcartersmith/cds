import React from 'react';
import { ComponentCard, ComponentCardProps } from '@site/src/components/home/ComponentCard';
import { Hero } from '@site/src/components/home/Hero';
import {
  QuickStartCampaignCard,
  QuickStartLinkProps,
} from '@site/src/components/home/QuickStartCampaignCard';
import ApiOverviewBannerLight from '@site/static/img/campaignCardBanners/api_overview.svg';
import ApiOverviewBannerDark from '@site/static/img/campaignCardBanners/api_overview_dark.svg';
import InstallationBannerLight from '@site/static/img/campaignCardBanners/installation.svg';
import InstallationBannerDark from '@site/static/img/campaignCardBanners/installation_dark.svg';
import IntroductionBannerLight from '@site/static/img/campaignCardBanners/introduction.svg';
import IntroductionBannerDark from '@site/static/img/campaignCardBanners/introduction_dark.svg';
import ThemingBannerLight from '@site/static/img/campaignCardBanners/theming.svg';
import ThemingBannerDark from '@site/static/img/campaignCardBanners/theming_dark.svg';

import styles from './home.module.css';

const quickStartCards: QuickStartLinkProps[] = [
  {
    title: 'Introduction',
    description: 'Learn about the purpose, features, and vision behind our component library.',
    link: {
      label: 'Go to Introduction',
      to: '/getting-started/introduction',
    },
    BannerComponentLight: IntroductionBannerLight,
    BannerComponentDark: IntroductionBannerDark,
  },
  {
    title: 'Installation',
    description: 'Get started quickly with our step-by-step installation guide.',
    link: {
      label: 'Go to Installation',
      to: '/getting-started/installation',
    },
    BannerComponentLight: InstallationBannerLight,
    BannerComponentDark: InstallationBannerDark,
  },
  {
    title: 'API Overview',
    description: 'Discover the core building blocks and how to integrate them seamlessly.',
    link: {
      label: 'Go to API Overview',
      to: '/getting-started/api-overview',
    },
    BannerComponentLight: ApiOverviewBannerLight,
    BannerComponentDark: ApiOverviewBannerDark,
  },
  {
    title: 'Theming',
    description: 'Customize your designs with our powerful theming options and guidelines.',
    link: {
      label: 'Go to Theming',
      to: '/getting-started/theming',
    },
    BannerComponentLight: ThemingBannerLight,
    BannerComponentDark: ThemingBannerDark,
  },
];

const componentCards: ComponentCardProps[] = [
  {
    name: 'Layout',
    count: 11,
    bannerLightSrc: '/img/componentCardBanners/layout_light.svg',
    bannerLightOverlaySrc: '/img/componentCardBanners/layout_light_hover.svg',
    bannerDarkSrc: '/img/componentCardBanners/layout_dark.svg',
    bannerDarkOverlaySrc: '/img/componentCardBanners/layout_dark_hover.svg',
    to: '/components/layout/Accordion',
  },
  {
    name: 'Typography',
    count: 3,
    bannerLightSrc: '/img/componentCardBanners/typography_light.svg',
    bannerLightOverlaySrc: '/img/componentCardBanners/typography_light_hover.svg',
    bannerDarkSrc: '/img/componentCardBanners/typography_dark.svg',
    bannerDarkOverlaySrc: '/img/componentCardBanners/typography_dark_hover.svg',
    to: '/components/typography/link',
  },
  {
    name: 'Inputs',
    count: 12,
    bannerLightSrc: '/img/componentCardBanners/inputs_light.svg',
    bannerLightOverlaySrc: '/img/componentCardBanners/inputs_light_hover.svg',
    bannerDarkSrc: '/img/componentCardBanners/inputs_dark.svg',
    bannerDarkOverlaySrc: '/img/componentCardBanners/inputs_dark_hover.svg',
    to: 'components/inputs/Button',
  },
  {
    name: 'Media',
    count: 7,
    bannerLightSrc: '/img/componentCardBanners/media_light.svg',
    bannerLightOverlaySrc: '/img/componentCardBanners/media_light_hover.svg',
    bannerDarkSrc: '/img/componentCardBanners/media_dark.svg',
    bannerDarkOverlaySrc: '/img/componentCardBanners/media_dark_hover.svg',
    to: 'components/media/heroSquare',
  },
  {
    name: 'Cards',
    count: 5,
    bannerLightSrc: '/img/componentCardBanners/cards_light.svg',
    bannerLightOverlaySrc: '/img/componentCardBanners/cards_light_hover.svg',
    bannerDarkSrc: '/img/componentCardBanners/cards_dark.svg',
    bannerDarkOverlaySrc: '/img/componentCardBanners/cards_dark_hover.svg',
    to: 'components/cards/ContainedAssetCard',
  },
  {
    name: 'Data Display',
    count: 4,
    bannerLightSrc: '/img/componentCardBanners/data_display_light.svg',
    bannerLightOverlaySrc: '/img/componentCardBanners/data_display_light_hover.svg',
    bannerDarkSrc: '/img/componentCardBanners/data_display_dark.svg',
    bannerDarkOverlaySrc: '/img/componentCardBanners/data_display_dark_hover.svg',
    to: 'components/cards/ContainedAssetCard',
  },
  {
    name: 'Feedback',
    count: 4,
    bannerLightSrc: '/img/componentCardBanners/feedback_light.svg',
    bannerLightOverlaySrc: '/img/componentCardBanners/feedback_light_hover.svg',
    bannerDarkSrc: '/img/componentCardBanners/feedback_dark.svg',
    bannerDarkOverlaySrc: '/img/componentCardBanners/feedback_dark_hover.svg',
    to: 'components/feedback/banner',
  },
  {
    name: 'Overlay',
    count: 5,
    bannerLightSrc: '/img/componentCardBanners/overlays_light.svg',
    bannerLightOverlaySrc: '/img/componentCardBanners/overlays_light_hover.svg',
    bannerDarkSrc: '/img/componentCardBanners/overlays_dark.svg',
    bannerDarkOverlaySrc: '/img/componentCardBanners/overlays_dark_hover.svg',
    to: 'components/overlay/alert',
  },
  {
    name: 'Navigation',
    count: 6,
    bannerLightSrc: '/img/componentCardBanners/navigation_light.svg',
    bannerLightOverlaySrc: '/img/componentCardBanners/navigation_light_hover.svg',
    bannerDarkSrc: '/img/componentCardBanners/navigation_dark.svg',
    bannerDarkOverlaySrc: '/img/componentCardBanners/navigation_dark_hover.svg',
    to: 'components/navigation/pageHeader',
  },
  {
    name: 'Graphs',
    count: 3,
    bannerLightSrc: '/img/componentCardBanners/graphs_light.svg',
    bannerLightOverlaySrc: '/img/componentCardBanners/graphs_light_hover.svg',
    bannerDarkSrc: '/img/componentCardBanners/graphs_dark.svg',
    bannerDarkOverlaySrc: '/img/componentCardBanners/graphs_dark_hover.svg',
    to: 'components/graphs/sparkline',
  },
];

export default function Home() {
  return (
    <div className={styles.homePageWrapper}>
      <Hero />
      <section className={styles.sectionWrapper}>
        <h2 className={styles.sectionHeader}>Quickstarts</h2>
        <div className={styles.quickStartCardsWrapper}>
          {quickStartCards.map((cardProps) => (
            <QuickStartCampaignCard key={cardProps.title} {...cardProps} />
          ))}
        </div>
      </section>
      <section className={styles.sectionWrapper}>
        <h2 className={styles.sectionHeader}>Components</h2>
        <div className={styles.componentCardsWrapper}>
          {componentCards.map((cardProps) => (
            <ComponentCard key={cardProps.name} {...cardProps} />
          ))}
        </div>
      </section>
    </div>
  );
}
