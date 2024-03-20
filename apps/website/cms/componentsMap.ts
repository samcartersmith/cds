import { ComponentMapValue } from '@cb/cms';
import { Banner } from '@cbhq/cds-web/banner/Banner';

import { Accordion } from './misc/Accordion';
import { Admonition } from './misc/Admonition';
import { Attribution } from './misc/Attribution';
import { CodePlayground } from './misc/CodePlayground';
import { Embedded } from './misc/Embedded';
import { Link } from './misc/Link';
import { MediaAsset } from './misc/MediaAsset';
import { RichText } from './misc/RichText';
import { TextBlock } from './misc/TextBlock';
import { Card, CardList } from './modules/Card';
import { CodeExample } from './modules/CodeExample';
import { DoDont } from './modules/DoDont';
import { MediaContent } from './modules/MediaContent';
import { Overview } from './modules/Overview';
import { StaticReadme } from './modules/StaticReadme';
import { TabItem } from './modules/TabItem';
import { Tabs } from './modules/Tabs';

/** keys must match content IDs from contentful */
export const componentsMap = {
  miscLink: Link,
  miscMediaAsset: MediaAsset,
  miscTextBlock: TextBlock,
  moduleCodeExample: CodeExample,
  moduleDoDont: DoDont,
  moduleMediaContent: MediaContent,
  moduleOverview: Overview,
  miscRichText: RichText,
  miscAccordion: Accordion,
  miscEmbedded: Embedded,
  miscCodePlayground: CodePlayground,
  miscAttribution: Attribution,
  moduleStaticReadme: StaticReadme,
  moduleTabs: Tabs,
  moduleTabItem: TabItem,
  moduleCardList: CardList,
  moduleCard: Card,
  moduleBanner: Banner,
  miscAdmonition: Admonition,
} as unknown as Record<string, ComponentMapValue>;
