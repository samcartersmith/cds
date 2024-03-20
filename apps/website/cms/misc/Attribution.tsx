import React, { useCallback } from 'react';
import { Asset } from 'contentful';
import { Chip as CDSChip } from '@cbhq/cds-web/chips';
import { Avatar } from '@cbhq/cds-web/media';
import { TextLabel2 } from '@cbhq/cds-web/typography';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

export type AttributionFields = {
  media?: Asset;
  name: string;
  url?: string;
};

export function Attribution({ media, name, url }: AttributionFields) {
  const handlePress = useCallback(() => {
    getBrowserGlobals()?.window?.open(url, '_blank');
  }, [url]);
  return (
    <CDSChip
      onPress={url ? handlePress : undefined}
      start={media && <Avatar alt={name} size="m" src={media?.fields?.file.url} />}
    >
      <TextLabel2 as="span">{name}</TextLabel2>
    </CDSChip>
  );
}
