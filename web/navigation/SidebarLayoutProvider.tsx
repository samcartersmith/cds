import { useContext, useState, memo } from 'react';

import { SidebarLayoutContext, SetSidebarLayoutContext, SidebarLayout } from './context';

type SidebarLayoutProviderProps = {
  variant: SidebarLayout;
};

export const SidebarLayoutProvider: React.FC<SidebarLayoutProviderProps> = memo(
  ({ variant, children }) => {
    const [layout, setLayout] = useState<SidebarLayout>(variant);

    return (
      <SidebarLayoutContext.Provider value={layout}>
        <SetSidebarLayoutContext.Provider value={setLayout}>
          {children}
        </SetSidebarLayoutContext.Provider>
      </SidebarLayoutContext.Provider>
    );
  }
);

export const useSidebarLayout = () => {
  return useContext(SidebarLayoutContext);
};

export const useSetSidebarLayout = () => {
  return useContext(SetSidebarLayoutContext);
};

SidebarLayoutProvider.displayName = 'SidebarLayoutProvider';
