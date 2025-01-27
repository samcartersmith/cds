import React, { useState } from 'react';
import { TabComponent } from '@site/src/components/page/TabComponent';
import { TabIndicator } from '@site/src/components/page/TabIndicator';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { TabValue } from '@cbhq/cds-common2/tabs/useTabs';
import { Box, Divider, VStack } from '@cbhq/cds-web2/layout';
import { Tabs } from '@cbhq/cds-web2/tabs/Tabs';
import { Text } from '@cbhq/cds-web2/text/Text';

const tabs = [
  { id: 'examples-tab', label: 'Examples' },
  { id: 'props-tab', label: 'Props' },
];

type ComponentMetaContainerProps = {
  webPropsTable?: React.ReactNode;
  nativePropsTable?: React.ReactNode;
  webExamples?: React.ReactNode;
  nativeExamples?: React.ReactNode;
};

export const ComponentTabsContainer: React.FC<ComponentMetaContainerProps> = ({
  webExamples,
  nativeExamples,
  webPropsTable,
  nativePropsTable,
}) => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  const { platform } = usePlatformContext();
  const shouldRenderExamples = activeTab?.id === 'examples-tab';
  const shouldRenderProps = activeTab?.id === 'props-tab';
  const isWeb = platform === 'web';
  const isNative = platform === 'native';

  return (
    <VStack background="backgroundAlternate" borderRadius={500} paddingTop={3}>
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
      <VStack gap={3} paddingBottom={4} paddingLeft={4} paddingRight={4} paddingTop={5}>
        <Box>
          <Text>
            {activeTab?.label} for {platform} goes here
          </Text>
        </Box>
        {shouldRenderExamples && isWeb && webExamples}
        {shouldRenderExamples && isNative && nativeExamples}
        {shouldRenderProps && isWeb && webPropsTable}
        {shouldRenderProps && isNative && nativePropsTable}
      </VStack>
    </VStack>
  );
};
