import React, { memo } from 'react';
import type { Entry } from 'contentful';
import { CMSProvider, ComponentMapValue } from '@cb/cms';
import { Expand } from '@cbhq/cds-web';
import { Divider } from '@cbhq/cds-web/layout/Divider';
import { Group } from '@cbhq/cds-web/layout/Group';
import { TOKENS } from '@cbhq/docusaurus-theme/theme/tokens';

import { useComposePage } from '../../useComposePage';
import { useContentfulConfig } from '../../useContentfulConfig';

import LandingPageAnnouncementItem, { AnnouncementFields } from './LandingPageAnnouncementItem';
import LandingPageAnnouncements, {
  LandingPageAnnouncementsProps,
} from './LandingPageAnnouncements';
import LandingPageAnnouncementsFallback from './LandingPageAnnouncementsFallback';
import LandingPageCategories, { LandingPageCategoriesProps } from './LandingPageCategories';
import LandingPageFocusAreaGroup from './LandingPageFocusAreaGroup';
import LandingPageFocusAreaItem from './LandingPageFocusAreaItem';
import LandingPageFocusAreas, { FocusAreaSectionFields } from './LandingPageFocusAreas';
import LandingPageFocusAreasFallback from './LandingPageFocusAreasFallback';

export type LandingPageFields = {
  announcements: Entry<AnnouncementFields>[];
  focusAreas: Entry<FocusAreaSectionFields>[];
};

export type LandingPageProps = Expand<
  LandingPageAnnouncementsProps &
    LandingPageCategoriesProps & {
      title?: string;
      categories: LandingPageCategoriesProps[];
    }
>;

const componentsMap = {
  landingPageAnnouncements: LandingPageAnnouncementItem,
  landingPageFocusArea: LandingPageFocusAreaGroup,
  landingPageFocusAreaItem: LandingPageFocusAreaItem,
} as unknown as Record<string, ComponentMapValue>;

function HorizontalDivider() {
  return <Divider direction="horizontal" offsetHorizontal={TOKENS.docItem.spacingHorizontal} />;
}

const LandingPage = memo(function LandingPage({ title, categories }: LandingPageProps) {
  const { space } = useContentfulConfig();
  const { pageData, handleError } = useComposePage<LandingPageFields>();

  if (!pageData?.content?.fields) {
    return (
      <Group className="landing-page" divider={HorizontalDivider} position="relative">
        <h1 className="hero-title">{title}</h1>
        <LandingPageAnnouncementsFallback />
        <LandingPageCategories categories={categories} />
        <LandingPageFocusAreasFallback />
      </Group>
    );
  }

  const { announcements, focusAreas } = pageData.content.fields;

  return (
    <CMSProvider components={componentsMap} locale="en" onError={handleError} spaceId={space}>
      <Group className="landing-page" divider={HorizontalDivider} position="relative">
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

export { LandingPage };
