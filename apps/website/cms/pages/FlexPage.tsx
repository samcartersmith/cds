import React, { memo } from 'react';
import { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';

import { OverviewFields } from '../modules/Overview';
import { TabItemFields } from '../modules/TabItem';
import { Tabs } from '../modules/Tabs';

export type FlexPageProps = {
  content: FlexPageFields;
};

export type FlexPageFields = {
  overview: Entry<OverviewFields>;
  tabs?: Entry<TabItemFields>[];
};

export const FlexPage = memo(function FlexPage({ content }: FlexPageProps) {
  const { tabs, overview } = content;

  return (
    <>
      {overview && <CMSContent content={overview} />}
      {tabs && <Tabs gap={0} id="page" items={tabs} />}
    </>
  );
});
