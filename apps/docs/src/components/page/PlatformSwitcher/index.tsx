import React, { useCallback, useMemo } from 'react';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { TabValue } from '@cbhq/cds-common2/tabs/useTabs';
import { TabsActiveIndicator } from '@cbhq/cds-web2/tabs';
import { SegmentedTabs } from '@cbhq/cds-web2/tabs/SegmentedTabs';
import { SegmentedTabsActiveIndicatorProps } from '@cbhq/cds-web2/tabs/SegmentedTabsActiveIndicator';

const SegmentedTabsActiveIndicator = ({ ...props }: SegmentedTabsActiveIndicatorProps) => {
  return <TabsActiveIndicator borderRadius={300} {...props} />;
};

export const PlatformSwitcher = () => {
  const { supportsWeb, supportsMobile, platform, setPlatform } = usePlatformContext();

  const tabs = useMemo<TabValue[]>(
    () => [
      ...(supportsWeb ? [{ id: 'web', label: supportsMobile ? 'Web' : 'Web Only' }] : []),
      ...(supportsMobile
        ? [
            {
              id: 'mobile',
              label: supportsWeb ? 'Mobile' : 'Mobile Only',
            },
          ]
        : []),
    ],
    [supportsMobile, supportsWeb],
  );

  const handlePlatformChange = useCallback(
    (tab: TabValue | null) => {
      setPlatform(tab?.id as 'web' | 'mobile');
    },
    [setPlatform],
  );

  const activeTab = tabs.find(({ id }) => id === platform) ?? null;
  return (
    <SegmentedTabs
      TabsActiveIndicatorComponent={SegmentedTabsActiveIndicator}
      activeTab={activeTab}
      borderRadius={300}
      onChange={handlePlatformChange}
      tabs={tabs}
    />
  );
};
