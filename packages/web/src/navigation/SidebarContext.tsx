import React from 'react';

export type SidebarContextType = {
  collapsed?: boolean;
  variant?: 'default' | 'condensed';
};

export const SidebarContext = React.createContext<SidebarContextType>({
  collapsed: false,
  variant: 'default',
});

export const SidebarProvider = SidebarContext.Provider;

export const useSidebarContext = () => {
  const context = React.useContext(SidebarContext);
  return context;
};
