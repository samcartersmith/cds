import React, { memo, useCallback } from 'react';
import ScrollSnapCarousel from '@theme/ScrollSnapCarousel';
import type { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';

import { AnnouncementFields } from './LandingPageAnnouncementItem';

export type ContentfulAnnouncements = Entry<AnnouncementFields>[];

export type LandingPageAnnouncementsProps = {
  announcements: ContentfulAnnouncements | undefined | null;
};

const LandingPageAnnouncements = memo(function LandingPageAnnouncements({
  announcements,
}: LandingPageAnnouncementsProps) {
  const renderCards = useCallback(
    (cards) => <CMSContent content={cards as ContentfulAnnouncements} />,
    [],
  );

  return <ScrollSnapCarousel cards={announcements} renderCards={renderCards} />;
});

export default LandingPageAnnouncements;
