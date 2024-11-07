import { createContext, useContext } from 'react';

import { type TabsApi } from './useTabs';

export type TabsContextValue = TabsApi;

export const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = (): TabsContextValue => {
  const context = useContext(TabsContext);
  if (!context) throw Error('useTabsContext must be used within a TabsContext.Provider');
  return context;
};
