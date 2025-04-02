import React, { useState } from 'react';
import { TOCItem } from '@docusaurus/mdx-loader';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { Box, Divider, VStack } from '@cbhq/cds-web2/layout';
import { TabNavigation } from '@cbhq/cds-web2/tabs/TabNavigation';

import { TOCUpdater } from '../../../utils/toc/TOCManager';

const tabs = [
  { id: 'examples-tab', label: 'Examples' },
  { id: 'api-tab', label: 'API' },
];

type HookTabsContainerProps = {
  webApi?: React.ReactNode;
  mobileApi?: React.ReactNode;
  webExamples?: React.ReactNode;
  mobileExamples?: React.ReactNode;
  webApiToc?: TOCItem[];
  mobileApiToc?: TOCItem[];
  webExamplesToc?: TOCItem[];
  mobileExamplesToc?: TOCItem[];
};

export const HookTabsContainer: React.FC<HookTabsContainerProps> = ({
  webExamples,
  mobileExamples,
  webApi,
  mobileApi,
  webExamplesToc,
  mobileExamplesToc,
  webApiToc,
  mobileApiToc,
}) => {
  const [activeTab, setActiveTab] = useState<string>('examples-tab');
  const { platform } = usePlatformContext();
  const shouldRenderExamples = activeTab === tabs[0].id;
  const shouldRenderApi = activeTab === tabs[1].id;
  const isWeb = platform === 'web';
  const isMobile = platform === 'mobile';

  return (
    <VStack as="section">
      <VStack background="bg" position="sticky" top="var(--ifm-navbar-height)" zIndex={1}>
        <Box
          background="bgAlternate"
          borderTopLeftRadius={500}
          borderTopRightRadius={500}
          paddingTop={1}
          paddingX={4}
        >
          <TabNavigation onChange={setActiveTab} tabs={tabs} value={activeTab} />
        </Box>
        <Divider />
      </VStack>

      <VStack
        background="bgAlternate"
        borderBottomLeftRadius={500}
        borderBottomRightRadius={500}
        zIndex={0}
      >
        <VStack
          accessibilityLabelledBy="tab--examples-tab"
          hidden={!shouldRenderExamples}
          id="tabpanel--examples-tab"
          role="tabpanel"
        >
          {shouldRenderExamples && <TOCUpdater toc={isWeb ? webExamplesToc : mobileExamplesToc} />}
          {shouldRenderExamples && isWeb && webExamples}
          {shouldRenderExamples && isMobile && mobileExamples}
        </VStack>

        <VStack
          accessibilityLabelledBy="tab--api-tab"
          hidden={!shouldRenderApi}
          id="tabpanel--api-tab"
          role="tabpanel"
        >
          {shouldRenderApi && <TOCUpdater toc={isWeb ? webApiToc : mobileApiToc} />}
          {shouldRenderApi && isWeb && webApi}
          {shouldRenderApi && isMobile && mobileApi}
        </VStack>
      </VStack>
    </VStack>
  );
};
