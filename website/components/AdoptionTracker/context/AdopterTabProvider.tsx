import React, { createContext, Dispatch, memo, SetStateAction, useState } from 'react';
import { AdopterTabKey } from '../types';

export type AdopterTabContextType = {
  tabKey: string;
  setTabKey: Dispatch<SetStateAction<AdopterTabKey>>;
};

export const AdopterTabContext = createContext<AdopterTabContextType | undefined>(undefined);

export const AdopterTabProvider: React.FC = memo(({ children }) => {
  const [tabKey, setTabKey] = useState<AdopterTabKey>('cds');
  const value = { tabKey, setTabKey };
  return <AdopterTabContext.Provider value={value}>{children}</AdopterTabContext.Provider>;
});
