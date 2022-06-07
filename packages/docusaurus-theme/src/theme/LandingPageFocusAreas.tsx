import React, { memo } from 'react';
import LandingPageFocusAreaItem from '@theme/LandingPageFocusAreaItem';
import { LandingPageFocusAreasProps } from '@theme/LandingPageFocusAreas';
import { CardGroup } from '@cbhq/cds-web/alpha/CardGroup';
import { Divider } from '@cbhq/cds-web/layout/Divider';

function VerticalDivider() {
  return <Divider direction="vertical" />;
}

const FocusAreas = memo(function FocusAreas({ focusAreas }: LandingPageFocusAreasProps) {
  if (focusAreas) {
    return (
      <CardGroup divider={VerticalDivider} direction="horizontal" justifyContent="space-between">
        {focusAreas.map((item) => (
          <LandingPageFocusAreaItem key={item.title} {...item} />
        ))}
      </CardGroup>
    );
  }
  return null;
});

export default FocusAreas;
