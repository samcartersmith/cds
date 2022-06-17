import React, { memo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { LandingPageFields, LandingPageProps } from '@theme/LandingPage';
import LandingPageAnnouncementItem from '@theme/LandingPageAnnouncementItem';
import LandingPageAnnouncements from '@theme/LandingPageAnnouncements';
import LandingPageCategories from '@theme/LandingPageCategories';
import LandingPageFocusAreaGroup from '@theme/LandingPageFocusAreaGroup';
import LandingPageFocusAreaItem from '@theme/LandingPageFocusAreaItem';
import LandingPageFocusAreas from '@theme/LandingPageFocusAreas';
import useComposePage from '@theme/useComposePage';
import { CMSProvider, ComponentMapValue, initContentfulClient } from '@cb/cms';
import { Divider } from '@cbhq/cds-web/layout/Divider';
import { Group } from '@cbhq/cds-web/layout/Group';

import { TOKENS } from './tokens';

type ContentfulOptions = {
  accessToken: string;
  space: string;
  host: string;
  clientKey?: string;
};

const componentsMap = {
  landingPageAnnouncements: LandingPageAnnouncementItem,
  landingPageFocusArea: LandingPageFocusAreaGroup,
  landingPageFocusAreaItem: LandingPageFocusAreaItem,
} as unknown as Record<string, ComponentMapValue>;

function HorizontalDivider() {
  return <Divider direction="horizontal" offsetHorizontal={TOKENS.docItem.spacingHorizontal} />;
}

const LandingPage = memo(function LandingPage({ title, categories }: LandingPageProps) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const { accessToken, space, host, clientKey } = customFields?.contentful as ContentfulOptions;

  initContentfulClient(
    {
      accessToken,
      space,
      host,
    },
    clientKey,
  );

  const { pageData, handleError } = useComposePage({
    route: 'docs-landing-page',
    spaceId: space,
    clientKey,
  });

  if (!pageData?.content?.fields) {
    return (
      <Group position="relative" divider={HorizontalDivider} dangerouslySetClassName="landing-page">
        <h1 className="hero-title">{title}</h1>
        <LandingPageCategories categories={categories} />
      </Group>
    );
  }

  const { announcements, focusAreas } = pageData.content.fields as LandingPageFields;

  return (
    <CMSProvider spaceId={space} locale="en" onError={handleError} components={componentsMap}>
      <Group position="relative" divider={HorizontalDivider} dangerouslySetClassName="landing-page">
        <h1 className="hero-title">{title}</h1>
        <LandingPageAnnouncements announcements={announcements} />
        <LandingPageCategories categories={categories} />
        {focusAreas.map((focusArea) => (
          <LandingPageFocusAreas key={focusArea.sys.id} {...focusArea.fields} />
        ))}
      </Group>
    </CMSProvider>
  );
});

export default LandingPage;
