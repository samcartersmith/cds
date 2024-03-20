import React from 'react';
import { Asset } from 'contentful';
import { Chip as CDSChip } from '@cbhq/cds-web/chips';
import { Avatar } from '@cbhq/cds-web/media';
import { TextLabel2 } from '@cbhq/cds-web/typography';

export type AttributionFields = {
  media?: Asset;
  name: string;
};

export function Attribution({ media, name }: AttributionFields) {
  return (
    <CDSChip start={media && <Avatar alt={name} size="s" src={media?.fields?.file.url} />}>
      <TextLabel2 as="span">{name}</TextLabel2>
    </CDSChip>
  );
}
