import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { useTabsContext } from '@cbhq/cds-common2/tabs/TabsContext';
import { TabValue } from '@cbhq/cds-common2/tabs/useTabs';
import type { TabbedChipsBaseProps } from '@cbhq/cds-common2/types';

import { Tabs } from '../tabs';

import { Chip } from './Chip';

const TabComponent = ({ label = '', id, ...tabProps }: TabValue) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = activeTab?.id === id;
  const handleClick = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);
  return (
    <Chip inverted={isActive} onClick={handleClick} {...tabProps}>
      {label}
    </Chip>
  );
};

const TabsActiveIndicatorComponent = () => {
  return null;
};

export const TabbedChips = memo(
  forwardRef(function TabbedChips(
    { tabs, value, onChange, ...props }: TabbedChipsBaseProps,
    ref: React.ForwardedRef<HTMLElement | null>,
  ) {
    const activeTab = useMemo(() => tabs.find((tab) => tab.id === value), [tabs, value]);
    const handleChange = useCallback(
      (tabValue: TabValue | null) => {
        if (tabValue) onChange?.(tabValue.id);
      },
      [onChange],
    );

    return (
      <Tabs
        ref={ref}
        TabComponent={TabComponent}
        TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
        activeTab={activeTab || null}
        gap={1}
        onChange={handleChange}
        role="radiogroup"
        tabs={tabs.map(({ Component, ...tab }) => ({ ...tab }))}
        {...props}
      />
    );
  }),
);
