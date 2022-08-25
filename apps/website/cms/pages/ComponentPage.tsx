import React, { memo, ReactElement } from 'react';
import { Document } from '@contentful/rich-text-types';
import { TOCItems } from '@theme/createTOCManager';
import TabItem from '@theme-original/TabItem';
import Tabs from '@theme-original/Tabs';
import { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { HStack, VStack } from '@cbhq/cds-web/layout';

import { Divider } from '../components/Divider';
import { Section } from '../components/Section';
import { TextBlockFields } from '../misc/TextBlock';
import { CodeExampleFields } from '../modules/CodeExample';
import { DoDontFields } from '../modules/DoDont';
import { MediaContentFields } from '../modules/MediaContent';
import { OverviewFields } from '../modules/Overview';
import { populateExamplesToc, populateGuidelinesToc } from '../utils';

type DocgenProps = {
  element: ReactElement;
  toc?: TOCItems;
};

export type ComponentPageProps = {
  changelog?: DocgenProps;
  propsTable?: DocgenProps;
  metadata?: DocgenProps;
  content: ComponentPageFields;
};

export type ComponentPageFields = {
  name: string;
  description: string;
  codeExamples: Entry<CodeExampleFields>[];
  overview: Entry<OverviewFields>;
  principles: Entry<TextBlockFields>[];
  spacing: Entry<MediaContentFields>[];
  usage: Entry<DoDontFields>[];
  anatomy: Entry<MediaContentFields>[];
  sizing: Entry<MediaContentFields>[];
  behavior?: Entry<MediaContentFields>[];
  illustration?: Entry<MediaContentFields>[];
  content?: Entry<DoDontFields>[];
  callToAction?: Entry<Document>[];
  motion?: Entry<Document>[];
};

export const ComponentPage = memo(function ComponentPage({
  content: contentData,
  metadata,
  propsTable,
}: ComponentPageProps) {
  const {
    codeExamples,
    overview,
    principles,
    spacing,
    usage,
    anatomy,
    sizing,
    behavior,
    illustration,
    content,
    callToAction,
    motion,
  } = contentData;

  const tabItems = [
    <TabItem
      key="examples"
      value="examples"
      label="Examples"
      toc={populateExamplesToc({ metadata, propsTable, codeExamples })}
    >
      <Section title="Examples">
        {codeExamples && <CMSContent content={codeExamples} />}
        {metadata?.element && (
          <>
            {metadata?.element}
            <Divider />
          </>
        )}
        {propsTable?.element}
      </Section>
    </TabItem>,
    <TabItem
      key="guidelines"
      value="guidelines"
      label="Guidelines"
      toc={populateGuidelinesToc(contentData)}
    >
      {principles && (
        <Section title="Principles">
          <HStack gap={6}>
            <CMSContent content={principles} />
          </HStack>
        </Section>
      )}
      {usage && (
        <Section title="Usage">
          <CMSContent content={usage} />
        </Section>
      )}
      {anatomy && (
        <Section title="Anatomy">
          <CMSContent content={anatomy} />
        </Section>
      )}
      {spacing && (
        <Section title="Spacing">
          <VStack gap={3}>
            <CMSContent content={spacing} />
          </VStack>
        </Section>
      )}
      {sizing && (
        <Section title="Sizing">
          <VStack gap={3}>
            <CMSContent content={sizing} />
          </VStack>
        </Section>
      )}
      {behavior && (
        <Section title="Behavior">
          <VStack gap={3}>
            <CMSContent content={behavior} />
          </VStack>
        </Section>
      )}
      {illustration && (
        <Section title="Illustration">
          <CMSContent content={illustration} />
        </Section>
      )}
      {content && (
        <Section title="Content">
          <CMSContent content={content} />
        </Section>
      )}
      {callToAction && (
        <Section title="Call to Action">
          <CMSContent content={callToAction} />
        </Section>
      )}
      {motion && (
        <Section title="Motion">
          <CMSContent content={motion} />
        </Section>
      )}
    </TabItem>,
  ];

  return (
    <>
      {overview && <CMSContent content={overview} />}
      <Tabs groupId="page" gap={0} spacerHeight={8}>
        {tabItems}
      </Tabs>
    </>
  );
});
