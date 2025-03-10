import React, { useState } from 'react';
import { TOCItem } from '@docusaurus/mdx-loader';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { Box, Divider, VStack } from '@cbhq/cds-web2/layout';
import { TabNavigation } from '@cbhq/cds-web2/tabs/TabNavigation';

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
  const [activeTab, setActiveTab] = useState<string>('examples-tab');
  const { platform } = usePlatformContext();
  const shouldRenderExamples = activeTab === tabs[0].id;
  const shouldRenderProps = activeTab === tabs[1].id;
  const isWeb = platform === 'web';
  const isMobile = platform === 'mobile';

  return (
    <VStack>
      <VStack background="bg" position="sticky" top="var(--ifm-navbar-height)" zIndex={1}>
        <Box
          background="bgAlternate"
          borderTopLeftRadius={500}
          borderTopRightRadius={500}
          paddingTop={3}
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
        gap={3}
        paddingBottom={2}
        paddingEnd={4}
        paddingStart={4}
        paddingTop={5}
      >
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
