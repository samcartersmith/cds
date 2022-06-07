import React, { memo } from 'react';
import type { LandingPageProps } from '@theme/LandingPage';
import LandingPageAnnouncements from '@theme/LandingPageAnnouncements';
import LandingPageFocusAreas from '@theme/LandingPageFocusAreas';
import LandingPageProjectCategories from '@theme/LandingPageProjectCategories';
import PressableColorBlock from '@theme/PressableColorBlock';
import { Divider, Group, HStack } from '@cbhq/cds-web/layout';

const LandingPage = memo(function LandingPage({
  title,
  announcements,
  focusAreas,
  categories,
  quickLinks,
}: LandingPageProps) {
  return (
    <Group position="relative" divider={Divider} dangerouslySetClassName="landing-page">
      <h1 className="hero-title">{title}</h1>
      <LandingPageAnnouncements announcements={announcements} />
      <LandingPageFocusAreas focusAreas={focusAreas} />
      <HStack>
        {quickLinks?.map((item) => (
          <PressableColorBlock key={item.title} {...item} />
        ))}
      </HStack>
      {categories.map((category) => (
        <LandingPageProjectCategories key={category.label} {...category} />
      ))}
    </Group>
  );
});

export default LandingPage;
