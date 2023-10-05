import React, { memo, ReactElement } from 'react';
import { Document } from '@contentful/rich-text-types';
import { TOCItems } from '@theme/createTOCManager';
import TabItemOriginal from '@theme-original/TabItem';
import TabsOriginal from '@theme-original/Tabs';
import { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { Group, VStack } from '@cbhq/cds-web/layout';

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
  propsTable?: DocgenProps;
  metadata?: DocgenProps;
  staticExamples?: DocgenProps;
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
  accessibility?: Entry<Document>[];
  others?: Entry<Document>[];
};

export const ComponentPage = memo(function ComponentPage({
  content: contentData,
  metadata,
  propsTable,
  staticExamples,
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
    accessibility,
    others,
  } = contentData;

  const shouldShowExamplesTab = codeExamples || metadata || propsTable;

  const tabItems = [
    shouldShowExamplesTab && (
      <TabItemOriginal
        key="examples"
        value="examples"
        label="Examples"
        toc={populateExamplesToc({ metadata, propsTable, codeExamples, staticExamples })}
      >
        <Section title="Examples">
          <Group divider={Divider}>
            {codeExamples?.map((codeExample) => (
              <CMSContent key={codeExample.sys.id} content={codeExample} />
            ))}
            {staticExamples?.element && <VStack gap={2}>{staticExamples?.element}</VStack>}
            {metadata?.element}
            {propsTable?.element}
          </Group>
        </Section>
      </TabItemOriginal>
    ),
    <TabItemOriginal
      key="guidelines"
      value="guidelines"
      label="Guidelines"
      toc={populateGuidelinesToc(contentData)}
    >
      {principles && (
        <Section title="Principles" gap={6} direction="horizontal">
          <CMSContent content={principles} />
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
          <CMSContent content={spacing} />
        </Section>
      )}
      {sizing && (
        <Section title="Sizing">
          <CMSContent content={sizing} />
        </Section>
      )}
      {behavior && (
        <Section title="Behavior">
          <CMSContent content={behavior} />
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
      {accessibility && (
        <Section title="Accessibility">
          <CMSContent content={accessibility} />
        </Section>
      )}
      {others && (
        <Section title="Others">
          <CMSContent content={others} />
        </Section>
      )}
    </TabItemOriginal>,
  ].filter(Boolean);

  return (
    <>
      {overview && <CMSContent content={overview} />}
      <TabsOriginal groupId="page" gap={0} spacerHeight={8}>
        {tabItems}
      </TabsOriginal>
    </>
  );
});
