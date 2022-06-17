import React, { memo } from 'react';
import type { LandingPageAnnouncementsProps } from '@theme/LandingPageAnnouncements';
import { CMSContent } from '@cb/cms';

const LandingPageAnnouncements = memo(function LandingPageAnnouncements({
  announcements,
}: LandingPageAnnouncementsProps) {
  if (announcements) {
    return <CMSContent content={announcements} />;
  }
  return null;
});

export default LandingPageAnnouncements;
