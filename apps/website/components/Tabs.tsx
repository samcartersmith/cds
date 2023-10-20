import React, { memo, useMemo } from 'react';
import DocTabItem from '@theme/TabItem';
import DocTabs from '@theme/Tabs';

export type ValuesProps<T> = {
  label: string;
  id: T;
  content: React.ReactNode;
};

export type TabsProps<T extends string = string> = {
  id: string;
  defaultTab: T;
  values: ValuesProps<T>[];
};

export const Tabs = memo(({ id, defaultTab, values }: TabsProps) => {
  const children = useMemo(() => {
    return values.map((item) => (
      <DocTabItem key={item.id} value={item.id}>
        {item.content}
      </DocTabItem>
    ));
  }, [values]);

  return (
    <DocTabs
      lazy
      defaultValue={defaultTab}
      groupId={id}
      values={useMemo(
        () => values.map((item) => ({ label: item.label, value: item.id })),
        [values],
      )}
    >
      {children}
    </DocTabs>
  );
});

Tabs.displayName = 'Tabs';
