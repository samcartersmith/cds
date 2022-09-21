import React, { memo } from 'react';
import TabItemOriginal from '@theme-original/TabItem';
import { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { SpacingScale } from '@cbhq/cds-common';
import slugify from '@cbhq/docusaurus-theme/src/utils/slugify';

import { Section } from '../components/Section';

import type { TabsFields } from './Tabs';

export type TabItemFields = {
  label: string;
  value: string;
  sections?: Entry<SectionFields & TabsFields>[];
};

export type SectionFields = {
  title?: string;
  modules: Entry<unknown>[];
  gap?: SpacingScale;
  direction?: 'horizontal' | 'vertical';
};

export const TabItem = memo(function TabItem({ label, value, sections }: TabItemFields) {
  const toc = sections
    ?.map((section) => {
      if (section.fields.title) {
        return {
          id: slugify(section.fields.title),
          level: 3,
          value: section.fields.title,
        };
      }

      return null;
    })
    .filter(Boolean);

  return (
    <TabItemOriginal value={value} label={label} toc={toc}>
      {sections?.map((section) => {
        const { sys, fields } = section;
        switch (sys.contentType.sys.id) {
          case 'moduleSection': {
            const { direction, title, gap, modules } = fields;
            return (
              <Section key={sys.id} title={title} direction={direction} gap={gap}>
                <CMSContent content={modules} />
              </Section>
            );
          }
          case 'moduleTabs': {
            return <CMSContent key={sys.id} content={section} />;
          }
          default:
            return null;
        }
      })}
    </TabItemOriginal>
  );
});
