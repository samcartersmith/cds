import React, { memo } from 'react';
import { PaletteBackground } from '@cbhq/cds-common';
import { Card } from '@cbhq/cds-web/cards/Card';
import { TextTitle1 } from '@cbhq/cds-web/typography';

type AnnouncementCardProps = {
  title: string;
  body?: React.ReactNode;
  backgroundColor?: PaletteBackground;
};

export const AnnouncementCard = memo(function AnnouncementCard({
  title,
  body,
  backgroundColor,
}: AnnouncementCardProps) {
  return (
    <Card background={backgroundColor} elevation={1} spacing={2}>
      <TextTitle1 as="h3" spacingBottom={1}>
        {title}
      </TextTitle1>
      {body}
    </Card>
  );
});
