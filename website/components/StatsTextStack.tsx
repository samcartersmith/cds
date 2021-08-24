import React from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { TextLabel1, TextTitle2 } from '@cbhq/cds-web/typography';

type StatsTextStackProps = { label: string; stat: string };

export function StatsTextStack({ label, stat }: StatsTextStackProps) {
  return (
    <VStack>
      <TextLabel1 as="p" spacingBottom={1}>
        {label}
      </TextLabel1>
      <TextTitle2 as="h2">{stat}</TextTitle2>
    </VStack>
  );
}
