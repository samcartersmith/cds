import React, { memo } from 'react';
import LandingPageAnnouncementItem from '@theme/LandingPageAnnouncementItem';
import type { LandingPageAnnouncementsProps } from '@theme/LandingPageAnnouncements';
import ThemeProviderPreset from '@theme/ThemeProviderPreset';

const LandingPageAnnouncements = memo(function LandingPageAnnouncements({
  announcements,
}: LandingPageAnnouncementsProps) {
  if (announcements) {
    return (
      <ThemeProviderPreset preset="black">
        {announcements.map((item) => (
          <LandingPageAnnouncementItem key={item.title} {...item} />
        ))}
      </ThemeProviderPreset>
    );
  }
  return null;
});

export default LandingPageAnnouncements;
