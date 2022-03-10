import React from 'react';

export type SidebarContextType = {
  collapsed?: boolean;
};

export const SidebarContext = React.createContext<SidebarContextType>({
  collapsed: false,
});

export const SidebarProvider = SidebarContext.Provider;

export const useSidebarContext = () => {
  const context = React.useContext(SidebarContext);
  return context;
};
