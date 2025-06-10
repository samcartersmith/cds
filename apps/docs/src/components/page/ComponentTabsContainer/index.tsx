import React, { useState } from 'react';
import { TOCItem } from '@docusaurus/mdx-loader';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { useTabsContext } from '@cbhq/cds-common/tabs/TabsContext';
import { TabValue } from '@cbhq/cds-common/tabs/useTabs';
import { Box, VStack } from '@cbhq/cds-web/layout';
import { Pressable } from '@cbhq/cds-web/system';
import { Tabs, TabsActiveIndicator, TabsActiveIndicatorProps } from '@cbhq/cds-web/tabs/Tabs';

import { PropsTOCUpdater } from '../../../utils/toc/PropsTOCManager';
import { TOCUpdater } from '../../../utils/toc/TOCManager';

const examplesTab = { id: 'examples-tab', label: 'Examples' };
const propsTab = { id: 'props-tab', label: 'Props' };
const tabs = [examplesTab, propsTab];

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

const CustomTab = ({ id, label }: TabValue) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = activeTab?.id === id;
  return (
    <Pressable
      color={isActive ? 'fgPrimary' : 'fg'}
      font="headline"
      onClick={() => updateActiveTab(id)}
      paddingBottom={0.75}
      paddingTop={0.5}
    >
      {label}
    </Pressable>
  );
};

const CustomTabsActiveIndicator = (props: TabsActiveIndicatorProps) => {
  return <TabsActiveIndicator {...props} background="bgPrimary" bottom={0} height={2} />;
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
  const shouldRenderExamples = activeTab?.id === examplesTab.id;
  const shouldRenderProps = activeTab?.id === propsTab.id;
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
          <Tabs
            TabComponent={CustomTab}
            TabsActiveIndicatorComponent={CustomTabsActiveIndicator}
            accessibilityLabel="Component documentation sections"
            activeTab={activeTab}
            aria-controls={`tabpanel--${activeTab}`}
            gap={4}
            onChange={setActiveTab}
            tabs={tabs}
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
