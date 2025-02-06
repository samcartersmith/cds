import React, { useState } from 'react';
import { TOCItem } from '@docusaurus/mdx-loader';
import { TabComponent } from '@site/src/components/page/TabComponent';
import { TabIndicator } from '@site/src/components/page/TabIndicator';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { TabValue } from '@cbhq/cds-common2/tabs/useTabs';
import { Box, Divider, VStack } from '@cbhq/cds-web2/layout';
import { Tabs } from '@cbhq/cds-web2/tabs/Tabs';

import { PropsTOCUpdater } from '../../../utils/toc/PropsTOCManager';
import { TOCUpdater } from '../../../utils/toc/TOCManager';

const tabs = [
  { id: 'examples-tab', label: 'Examples' },
  { id: 'props-tab', label: 'Props' },
];

type ComponentMetaContainerProps = {
  webPropsTable?: React.ReactNode;
  mobilePropsTable?: React.ReactNode;
  webExamples?: React.ReactNode;
  mobileExamples?: React.ReactNode;
  webPropsToc?: TOCItem[];
  mobilePropsToc?: TOCItem[];
  webExamplesToc?: TOCItem[];
  mobileExamplesToc?: TOCItem[];
};

export const ComponentTabsContainer: React.FC<ComponentMetaContainerProps> = ({
  webExamples,
  mobileExamples,
  webPropsTable,
  mobilePropsTable,
  webExamplesToc,
  mobileExamplesToc,
  webPropsToc,
  mobilePropsToc,
}) => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  const { platform } = usePlatformContext();
  const shouldRenderExamples = activeTab?.id === 'examples-tab';
  const shouldRenderProps = activeTab?.id === 'props-tab';
  const isWeb = platform === 'web';
  const isMobile = platform === 'mobile';

  return (
    <VStack background="bgAlternate" borderRadius={500} paddingTop={3}>
      <Box paddingX={4}>
        <Tabs
          TabComponent={TabComponent}
          TabsActiveIndicatorComponent={TabIndicator}
          activeTab={activeTab}
          gap={4}
          onChange={setActiveTab}
          tabs={tabs}
        />
      </Box>
      <Divider />
      <VStack gap={3} paddingBottom={2} paddingLeft={4} paddingRight={4} paddingTop={5}>
        {shouldRenderExamples && <TOCUpdater toc={isWeb ? webExamplesToc : mobileExamplesToc} />}
        {shouldRenderExamples && isWeb && webExamples}
        {shouldRenderExamples && isMobile && mobileExamples}

        {shouldRenderProps && <PropsTOCUpdater toc={isWeb ? webPropsToc : mobilePropsToc} />}
        {shouldRenderProps && isWeb && webPropsTable}
        {shouldRenderProps && isMobile && mobilePropsTable}
      </VStack>
    </VStack>
  );
};
