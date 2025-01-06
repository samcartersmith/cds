import React from 'react';

import ReactLiveScope from '../../src/theme/ReactLiveScope';

export type PageContextType = {
  scope?: Record<string, unknown>;
};

export const PageContext = React.createContext<PageContextType>({
  scope: ReactLiveScope,
});

export const PageContextProvider = PageContext.Provider;

export const usePageContext = () => {
  const context = React.useContext(PageContext);
  return context;
};
