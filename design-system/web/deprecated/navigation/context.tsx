import React, { createContext, memo, useContext, useMemo, useState } from 'react';

import { NoopFn, SetState } from '@cbhq/cds-common';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { noop } from '@cbhq/cds-utils';

export type SidebarLayout = 'expanded' | 'condensed' | 'hidden';
export type NavigationProviderProps = {
  variant: SidebarLayout;
};

export const defaultLayout = 'expanded';
export const NavigationContext = createContext<{
  isMobileMenuVisible: boolean;
  toggleMobileMenuHidden: NoopFn;
  toggleMobileMenuVisibility: NoopFn;
  sidebarLayout: SidebarLayout;
  setSidebarLayout: SetState<SidebarLayout>;
}>({
  isMobileMenuVisible: false,
  toggleMobileMenuHidden: noop,
  toggleMobileMenuVisibility: noop,
  sidebarLayout: defaultLayout,
  setSidebarLayout: noop,
});

export const NavigationProvider: React.FC<NavigationProviderProps> = memo(
  ({ variant, children }) => {
    const [sidebarLayout, setSidebarLayout] = useState<SidebarLayout>(variant);
    const [
      isMobileMenuVisible,
      { toggle: toggleMobileMenuVisibility, toggleOff: toggleMobileMenuHidden },
    ] = useToggler(false);
    const value = useMemo(
      () => ({
        isMobileMenuVisible,
        toggleMobileMenuVisibility,
        toggleMobileMenuHidden,
        sidebarLayout,
        setSidebarLayout,
      }),
      [isMobileMenuVisible, sidebarLayout, toggleMobileMenuHidden, toggleMobileMenuVisibility],
    );

    return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
  },
);

export const useNavigation = () => {
  return useContext(NavigationContext);
};

NavigationProvider.displayName = 'NavigationProvider';
