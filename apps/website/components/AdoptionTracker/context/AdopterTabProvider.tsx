import React, { createContext, memo, useMemo, useState } from 'react';

import { AdopterTabKey } from '../types';

export type AdopterTabContextType = {
  tabKey: string;
  setTabKey: React.Dispatch<React.SetStateAction<AdopterTabKey>>;
};

export const AdopterTabContext = createContext<AdopterTabContextType | undefined>(undefined);

export const AdopterTabProvider: React.FC<React.PropsWithChildren<unknown>> = memo(
  ({ children }) => {
    const [tabKey, setTabKey] = useState<AdopterTabKey>('cds');
    const value = useMemo(() => ({ tabKey, setTabKey }), [tabKey]);
    return <AdopterTabContext.Provider value={value}>{children}</AdopterTabContext.Provider>;
  },
);
