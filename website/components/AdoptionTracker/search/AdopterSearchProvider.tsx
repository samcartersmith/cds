import React, { createContext, Dispatch, memo, SetStateAction, useState } from 'react';
import { AdopterSearchResult } from '../types';

export type AdopterSearchContextType = {
  results: AdopterSearchResult[];
  setResults: Dispatch<SetStateAction<AdopterSearchResult[]>>;
};

export const AdopterSearchContext = createContext<AdopterSearchContextType | undefined>(undefined);

export const AdopterSearchProvider: React.FC = memo(({ children }) => {
  const [results, setResults] = useState<AdopterSearchResult[]>([]);
  const value = { results, setResults };
  return <AdopterSearchContext.Provider value={value}>{children}</AdopterSearchContext.Provider>;
});
