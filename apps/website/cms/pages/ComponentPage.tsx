import React, { memo, ReactElement } from 'react';
import { Document } from '@contentful/rich-text-types';
import { TOCItems } from '@theme/createTOCManager';
import TabItem from '@theme-original/TabItem';
import Tabs from '@theme-original/Tabs';
import { Entry } from 'contentful';
import { CMSContent, CMSProvider, ComponentMapValue } from '@cb/cms';
import { Box, HStack, VStack } from '@cbhq/cds-web/layout';
import { Spinner } from '@cbhq/cds-web/loaders';

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
  /**
   * Fallback component when CMS response is not available
   */
  fallback?: ReactElement;
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

export const ComponentPage = memo(function CMS({
  changelog,
  propsTable,
  metadata,
  fallback,
}: CMSProps) {
  const { pageData, isLoading, space, handleError } = useComposePage<PageFields>();

  if (isLoading) {
    return (
      <Box alignItems="center" justifyContent="center">
        <Spinner size={5} color="primary" />
      </Box>
    );
  }

  // no API response
  if (!pageData?.content?.fields) {
    if (fallback) {
      return fallback;
    }

    return null;
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
    </TabItem>,
  ];

  if (changelog) {
    tabItems.push(
      <TabItem key="changelog" value="changelog" label="Changelog" toc={changelog?.toc}>
        {changelog?.element}
      </TabItem>,
    );
  }

  return (
    <CMSProvider spaceId={space} locale="en" onError={handleError} components={componentsMap}>
      {overview && <CMSContent content={overview} />}
      <Tabs groupId="page" gap={0} spacerHeight={8}>
        {tabItems}
      </Tabs>
    </CMSProvider>
  );
});
