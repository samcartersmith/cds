import React, { memo, ReactElement } from 'react';
import { Document } from '@contentful/rich-text-types';
import { TOCItems } from '@theme/createTOCManager';
import TabItem from '@theme-original/TabItem';
import Tabs from '@theme-original/Tabs';
import { Entry } from 'contentful';
import { CMSContent, CMSProvider, ComponentMapValue } from '@cb/cms';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextDisplay1 } from '@cbhq/cds-web/typography';

import { Divider } from '../components/Divider';
import { RichText } from '../components/RichText';
import { Section } from '../components/Section';
import { Link } from '../misc/Link';
import { MediaAsset } from '../misc/MediaAsset';
import { TextBlock, TextBlockFields } from '../misc/TextBlock';
import { CodeExample, CodeExampleFields } from '../modules/CodeExample';
import { DoDont, DoDontFields } from '../modules/DoDont';
import { MediaContent, MediaContentFields } from '../modules/MediaContent';
import { Overview, OverviewFields } from '../modules/Overview';
import { useComposePage } from '../useComposePage';
import { populateExamplesToc, populateGuidelinesToc } from '../utils';

type DocgenProps = {
  element: ReactElement;
  toc?: TOCItems;
};

export type CMSProps = {
  changelog?: DocgenProps;
  propsTable?: DocgenProps;
  metadata?: DocgenProps;
};

export type PageFields = {
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
  content?: Entry<DoDontFields>[];
  motion?: Document;
  others?: Document;
};

// keys are content IDs from contentful
const componentsMap = {
  miscLink: Link,
  miscMediaAsset: MediaAsset,
  miscTextBlock: TextBlock,
  moduleCodeExample: CodeExample,
  moduleDoDont: DoDont,
  moduleMediaContent: MediaContent,
  moduleOverview: Overview,
} as unknown as Record<string, ComponentMapValue>;

export const ComponentPage = memo(function CMS({ changelog, propsTable, metadata }: CMSProps) {
  const { pageData, space, handleError } = useComposePage<PageFields>();

  if (!pageData?.content?.fields) {
    // TODO: add fallback
    return <div>loading...</div>;
  }

  const {
    codeExamples,
    overview,
    principles,
    spacing,
    usage,
    anatomy,
    sizing,
    behavior,
    content,
    motion,
    others,
  } = pageData.content.fields;

  return (
    <CMSProvider spaceId={space} locale="en" onError={handleError} components={componentsMap}>
      <TextDisplay1 as="h1" spacingTop={3}>
        {pageData.title}
      </TextDisplay1>
      {overview && <CMSContent content={overview} />}
      <Tabs groupId="page" gap={0} spacerHeight={8}>
        <TabItem
          value="examples"
          label="Examples"
          toc={populateExamplesToc({ metadata, propsTable, codeExamples })}
        >
          <Section title="Examples">
            {codeExamples && <CMSContent content={codeExamples} />}
            {metadata?.element}
            <Divider />
            {propsTable?.element}
          </Section>
        </TabItem>
        <TabItem
          value="guidelines"
          label="Guidelines"
          toc={populateGuidelinesToc(pageData.content.fields)}
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
          {content && (
            <Section title="Content">
              <CMSContent content={content} />
            </Section>
          )}
          {motion && (
            <Section title="Motion">
              <RichText content={motion} />
            </Section>
          )}
          <RichText content={others} />
        </TabItem>
        <TabItem value="changelog" label="Changelog" toc={changelog?.toc}>
          {changelog?.element}
        </TabItem>
      </Tabs>
    </CMSProvider>
  );
});
