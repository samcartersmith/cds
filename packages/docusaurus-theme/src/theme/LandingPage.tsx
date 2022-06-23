import React, { memo } from 'react';
import type { LandingPageProps } from '@theme/LandingPage';
import LandingPageAnnouncements from '@theme/LandingPageAnnouncements';
import LandingPageFocusAreas from '@theme/LandingPageFocusAreas';
import LandingPageProjectCategories from '@theme/LandingPageProjectCategories';
import { Divider } from '@cbhq/cds-web/layout/Divider';
import { Group } from '@cbhq/cds-web/layout/Group';

import { TOKENS } from './tokens';

function HorizontalDivider() {
  return <Divider direction="horizontal" offsetHorizontal={TOKENS.docItem.spacingHorizontal} />;
}

const LandingPage = memo(function LandingPage({
  title,
  announcements,
  focusAreas,
  categories,
}: LandingPageProps) {
  return (
    <Group position="relative" divider={HorizontalDivider} dangerouslySetClassName="landing-page">
      <h1 className="hero-title">{title}</h1>
      <LandingPageAnnouncements announcements={announcements} />
      <LandingPageFocusAreas focusAreas={focusAreas} />
      {categories.map((category) => (
        <LandingPageProjectCategories key={category.label} {...category} />
      ))}
    </Group>
  );
});

export default LandingPage;
