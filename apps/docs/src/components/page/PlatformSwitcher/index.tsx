import React, { useCallback, useMemo } from 'react';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { TabValue } from '@cbhq/cds-common2/tabs/useTabs';
import { SegmentedTabs } from '@cbhq/cds-web2/tabs/SegmentedTabs';

export const PlatformSwitcher = () => {
  const { supportsWeb, supportsMobile, platform, setPlatform } = usePlatformContext();

  const tabs = useMemo<TabValue[]>(
    () => [
      { id: 'web', label: 'Web', disabled: !supportsWeb },
      {
        id: 'mobile',
        label: 'Mobile',
        disabled: !supportsMobile,
      },
    ],
    [supportsMobile, supportsWeb],
  );

  const handlePlatformChange = useCallback(
    (tab: TabValue | null) => {
      setPlatform(tab?.id as 'web' | 'mobile');
    },
    [setPlatform],
  );

  const activeTab = platform === 'web' ? tabs[0] : tabs[1];
  return <SegmentedTabs activeTab={activeTab} onChange={handlePlatformChange} tabs={tabs} />;
};
