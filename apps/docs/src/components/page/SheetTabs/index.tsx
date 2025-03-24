import React, { useCallback } from 'react';
import { useTabsContext } from '@cbhq/cds-common2/tabs/TabsContext';
import { TabValue } from '@cbhq/cds-common2/tabs/useTabs';
import { Box } from '@cbhq/cds-web2/layout';
import { TabsActiveIndicator, TabsActiveIndicatorProps } from '@cbhq/cds-web2/tabs';
import { Tabs as CDSTabs, TabsProps as CDSTabsProps } from '@cbhq/cds-web2/tabs/Tabs';
import { Text } from '@cbhq/cds-web2/typography';

const CustomTab = ({ id, label }: TabValue) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = activeTab?.id === id;
  const handleClick = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);

  return (
    <Box
      onClick={handleClick}
      paddingBottom={2}
      paddingX={1}
      style={{
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <Text color={isActive ? 'fgPrimary' : 'fg'} font="headline">
        {label}
      </Text>
    </Box>
  );
};

const CustomTabsActiveIndicator = (props: TabsActiveIndicatorProps) => (
  <TabsActiveIndicator
    bottom={0}
    height={3}
    style={{ backgroundColor: 'var(--color-fgPrimary)' }}
    {...props}
  />
);

export const SheetTabs = (
  props: Omit<CDSTabsProps, 'TabComponent' | 'TabsActiveIndicatorComponent'>,
) => (
  <CDSTabs
    {...props}
    TabComponent={CustomTab}
    TabsActiveIndicatorComponent={CustomTabsActiveIndicator}
  />
);
