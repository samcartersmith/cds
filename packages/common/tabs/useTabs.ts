import { useCallback, useMemo } from 'react';

export type TabValue = {
  /** The tab id */
  id: string;
  /** The tab label */
  label?: React.ReactNode;
  /** Disable interactions on the tab */
  disabled?: boolean;
};

export type TabsOptions = {
  /** The array of tabs data. */
  tabs: TabValue[];
  /** React state for the currently active tab. Setting it to `null` results in no active tab. */
  activeTab: TabValue | null;
  /** Callback that is fired when the active tab changes. Use this callback to update the `activeTab` state. */
  onChange: (activeTab: TabValue | null) => void;
  /** Disable interactions on all the tabs. */
  disabled?: boolean;
};

export type TabsApi = Omit<TabsOptions, 'onChange'> & {
  /** Update the currently active tab to the tab with `tabId`. */
  updateActiveTab: (tabId: string | null) => void;
  /** Update the currently active tab to the next enabled tab in the tabs array. Does nothing if the last tab is already active. */
  goNextTab: () => void;
  /** Update the currently active tab to the previous enabled tab in the tabs array. Does nothing if the first tab is already active. */
  goPreviousTab: () => void;
};

/** A controlled hook for managing tabs state, such as the currently active tab. */
export const useTabs = ({ tabs, activeTab, disabled, onChange }: TabsOptions): TabsApi => {
  const updateActiveTab = useCallback(
    (tabId: string | null) => {
      let newActiveTab = null;
      if (typeof tabId === 'string') {
        newActiveTab = tabs.find((tab) => tab.id === tabId);
        newActiveTab ||= tabs[0];
      }
      if (newActiveTab !== activeTab) onChange(newActiveTab);
    },
    [activeTab, tabs, onChange],
  );

  const goNextTab = useCallback(() => {
    if (!activeTab || activeTab === tabs.at(-1)) return;
    const activeTabIndex = tabs.indexOf(activeTab);
    // find next enabled tab
    for (let i = activeTabIndex + 1; i < tabs.length; i++) {
      if (!tabs[i].disabled) return onChange(tabs[i]);
    }
  }, [activeTab, onChange, tabs]);

  const goPreviousTab = useCallback(() => {
    if (!activeTab || activeTab === tabs[0]) return;
    const activeTabIndex = tabs.indexOf(activeTab);
    // find previous enabled tab
    for (let i = activeTabIndex - 1; i > -1; i--) {
      if (!tabs[i].disabled) return onChange(tabs[i]);
    }
  }, [activeTab, onChange, tabs]);

  const api = useMemo(
    () => ({
      tabs,
      activeTab,
      disabled,
      updateActiveTab,
      goNextTab,
      goPreviousTab,
    }),
    [tabs, activeTab, disabled, updateActiveTab, goNextTab, goPreviousTab],
  );

  return api;
};
