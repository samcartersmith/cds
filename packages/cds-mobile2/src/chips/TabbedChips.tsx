import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { TabbedChipsBaseProps } from '@cbhq/cds-common2';
import { useTabsContext } from '@cbhq/cds-common2/tabs/TabsContext';
import { TabValue } from '@cbhq/cds-common2/tabs/useTabs';

import { Tabs } from '../tabs';

import { Chip } from './Chip';

const TabComponent = ({ label = '', id, ...tabProps }: TabValue) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = activeTab?.id === id;
  const handleClick = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);
  return (
    <Chip inverted={isActive} onPress={handleClick} {...tabProps}>
      {label}
    </Chip>
  );
};

const TabsActiveIndicatorComponent = () => {
  return null;
};

export const TabbedChips = memo(
  forwardRef(function TabbedChips(
    { tabs, value, onChange, Component = TabComponent, ...props }: TabbedChipsBaseProps,
    ref: React.ForwardedRef<View>,
  ) {
    const activeTab = useMemo(() => tabs.find((tab) => tab.id === value), [tabs, value]);

    const handleChange = useCallback(
      (tabValue: TabValue | null) => {
        if (tabValue) onChange?.(tabValue.id);
      },
      [onChange],
    );

    return (
      <ScrollView horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false}>
        <Tabs
          ref={ref}
          TabComponent={Component}
          TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
          activeTab={activeTab || null}
          gap={1}
          onChange={handleChange}
          role="radiogroup"
          tabs={tabs}
          {...props}
        />
      </ScrollView>
    );
  }),
);
