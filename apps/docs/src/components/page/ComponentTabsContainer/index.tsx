import React, { useState } from 'react';
import { TOCItem } from '@docusaurus/mdx-loader';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { Box, VStack } from '@cbhq/cds-web/layout';
import { TabNavigation } from '@cbhq/cds-web/tabs/TabNavigation';

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
    <VStack as="section">
      <VStack background="bg" position="sticky" top="var(--ifm-navbar-height)" zIndex={2}>
        <Box
          borderedBottom
          background="bgAlternate"
          borderTopLeftRadius={500}
          borderTopRightRadius={500}
          paddingTop={1}
          paddingX={4}
        >
          <TabNavigation
            accessibilityLabel="Component documentation sections"
            aria-controls={`tabpanel--${activeTab}`}
            onChange={setActiveTab}
            tabs={tabs}
            value={activeTab}
          />
        </Box>
      </VStack>
      <VStack
        accessibilityLabelledBy="tab--examples-tab"
        background="bgAlternate"
        borderBottomLeftRadius={500}
        borderBottomRightRadius={500}
        display={shouldRenderExamples ? 'block' : 'none'}
        gap={3}
        id="tabpanel--examples-tab"
        paddingBottom={2}
        paddingEnd={4}
        paddingStart={4}
        paddingTop={5}
        role="tabpanel"
      >
        {shouldRenderExamples && <TOCUpdater toc={isWeb ? webExamplesToc : mobileExamplesToc} />}
        {shouldRenderExamples && isWeb && webExamples}
        {shouldRenderExamples && isMobile && mobileExamples}
      </VStack>
      <VStack
        accessibilityLabelledBy="tab--props-tab"
        background="bgAlternate"
        borderBottomLeftRadius={500}
        borderBottomRightRadius={500}
        display={shouldRenderProps ? 'block' : 'none'}
        gap={3}
        id="tabpanel--props-tab"
        role="tabpanel"
      >
        {shouldRenderProps && <PropsTOCUpdater toc={isWeb ? webPropsToc : mobilePropsToc} />}
        {shouldRenderProps && isWeb && webPropsTable}
        {shouldRenderProps && isMobile && mobilePropsTable}
      </VStack>
    </VStack>
  );
};
