import React, { createContext, memo, useMemo, useState } from 'react';

import { AdopterSearchResult } from '../types';

export type AdopterSearchContextType = {
  results: AdopterSearchResult[];
  setResults: React.Dispatch<React.SetStateAction<AdopterSearchResult[]>>;
};

export const AdopterSearchContext = createContext<AdopterSearchContextType | undefined>(undefined);

export const AdopterSearchProvider: React.FC<React.PropsWithChildren<unknown>> = memo(
  ({ children }) => {
    const [results, setResults] = useState<AdopterSearchResult[]>([]);
    const value = useMemo(() => ({ results, setResults }), [results]);
    return <AdopterSearchContext.Provider value={value}>{children}</AdopterSearchContext.Provider>;
  },
);
