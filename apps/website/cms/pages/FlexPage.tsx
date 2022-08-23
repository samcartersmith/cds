import React, { memo } from 'react';
import { TOCItem } from '@docusaurus/types';
import TabItem from '@theme-original/TabItem';
import Tabs from '@theme-original/Tabs';
import { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { SpacingScale } from '@cbhq/cds-common';
import { HStack } from '@cbhq/cds-web/alpha/HStack';
import { VStack } from '@cbhq/cds-web/alpha/VStack';
import slugify from '@cbhq/docusaurus-theme/src/utils/slugify';

import { Section } from '../components/Section';
import { OverviewFields } from '../modules/Overview';

export type FlexPageProps = {
  content: FlexPageFields;
};

export type FlexPageFields = {
  overview: Entry<OverviewFields>;
  tabs: Entry<{
    label: string;
    value: string;
    sections: Entry<SectionFields>[];
  }>[];
};

export type SectionFields = {
  title: string;
  gap: SpacingScale;
  direction: 'horizontal' | 'vertical';
  modules: Entry<unknown>[];
};

export const FlexPage = memo(function FlexPage({ content }: FlexPageProps) {
  const { tabs, overview } = content;

  return (
    <>
      {overview && <CMSContent content={overview} />}
      <Tabs groupId="page" gap={0} spacerHeight={8}>
        {tabs.map(({ fields: { label, value, sections } }) => {
          const toc = sections.map(
            (section): TOCItem => ({
              id: slugify(section.fields.title),
              level: 3,
              value: section.fields.title,
            }),
          );

          return (
            <TabItem key={label} value={value} label={label} toc={toc}>
              {sections.map(({ fields: { title, modules, gap, direction } }) => {
                const Stack = direction === 'horizontal' ? HStack : VStack;

                return (
                  <Section key={title} title={title}>
                    <Stack gap={gap}>
                      <CMSContent content={modules} />
                    </Stack>
                  </Section>
                );
              })}
            </TabItem>
          );
        })}
      </Tabs>
    </>
  );
});
