import React, { createContext, useContext } from 'react';

import { type RefMapApi } from '../hooks/useRefMap';

export type RefMapContextValue<RefValue> = RefMapApi<RefValue>;

export type RefMapProviderProps<RefValue> = {
  api: RefMapContextValue<RefValue>;
  children?: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RefMapContext = createContext({} as RefMapContextValue<any>);

export const useRefMapContext = <T,>() => {
  const context = useContext<RefMapContextValue<T>>(RefMapContext);
  if (!context.refs) throw new Error('useRefMapContext must be called inside a RefMapProvider');
  return context;
};
