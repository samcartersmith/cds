import React, { memo, useCallback } from 'react';
import { Document } from '@contentful/rich-text-types';
import { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { IllustrationPictogramNames } from '@cbhq/cds-common';
import { Card as CDSCard } from '@cbhq/cds-web/alpha/Card';
import { HStack } from '@cbhq/cds-web/alpha/HStack';
import { Button } from '@cbhq/cds-web/buttons';
import { Pictogram } from '@cbhq/cds-web/illustrations';
import { TextTitle2 } from '@cbhq/cds-web/typography';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

import { LinkFields } from '../misc/Link';
import { RichText } from '../misc/RichText';

export type CardListFields = {
  cards: Entry<CardFields>[];
};

export type CardFields = {
  title: string;
  description?: Document;
  pictogram?: IllustrationPictogramNames;
  link?: Entry<LinkFields>;
};

export const CardList = memo(function CardList({ cards }: CardListFields) {
  return (
    <HStack flexWrap="wrap" gap={3}>
      <CMSContent content={cards} />
    </HStack>
  );
});

export const Card = memo(function Card({ title, description, pictogram, link }: CardFields) {
  const onLinkPress = useCallback(
    () => getBrowserGlobals()?.window?.open(link?.fields.url, '_blank'),
    [link],
  );

  return (
    <CDSCard
      bordered
      alignItems="flex-start"
      borderRadius="roundedLarge"
      flexBasis="45%" // needs to be below 50% because of the gap
      gap={2}
      overflow="hidden"
      spacing={3}
    >
      {pictogram && <Pictogram name={pictogram} />}
      <TextTitle2 as="h2">{title}</TextTitle2>
      <RichText content={description} />
      {link && (
        <Button
          compact
          transparent
          endIcon="forwardArrow"
          flush="start"
          onPress={onLinkPress}
          variant="primary"
        >
          {link.fields.label}
        </Button>
      )}
    </CDSCard>
  );
});
