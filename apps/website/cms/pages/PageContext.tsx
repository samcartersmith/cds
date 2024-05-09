import React from 'react';
import { LiveProviderProps } from 'react-live';

import ReactLiveScope from '../../src/theme/ReactLiveScope';

export type PageContextType = {
  scope?: LiveProviderProps['scope'];
};

export const PageContext = React.createContext<PageContextType>({
  scope: ReactLiveScope,
});

export const PageContextProvider = PageContext.Provider;

export const usePageContext = () => {
  const context = React.useContext(PageContext);
  return context;
};
