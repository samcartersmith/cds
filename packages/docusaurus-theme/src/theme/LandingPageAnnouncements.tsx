import React, { memo, useCallback } from 'react';
import type {
  ContentfulAnnouncements,
  LandingPageAnnouncementsProps,
} from '@theme/LandingPageAnnouncements';
import ScrollSnapCarousel from '@theme/ScrollSnapCarousel';
import { CMSContent } from '@cb/cms';

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
