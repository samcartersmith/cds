import React, { memo } from 'react';
import LandingPageAnnouncementItem from '@theme/LandingPageAnnouncementItem';
import type { LandingPageAnnouncementsProps } from '@theme/LandingPageAnnouncements';

const LandingPageAnnouncements = memo(function LandingPageAnnouncements({
  announcements,
}: LandingPageAnnouncementsProps) {
  if (announcements) {
    return (
      <>
        {announcements.map((item) => (
          <LandingPageAnnouncementItem key={item.title} {...item} />
        ))}
      </>
    );
  }
  return null;
});

export default LandingPageAnnouncements;
