import React, { useState } from 'react';
import { SetState } from '@cbhq/cds-common/types';

export const SearchFilterContext = React.createContext('');
export const SetSearchFilterContext = React.createContext<SetState<string>>(() => {});

export const ExamplesSearchProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [filter, setFilter] = useState('');

  return (
    <SetSearchFilterContext.Provider value={setFilter}>
      <SearchFilterContext.Provider value={filter}>{children}</SearchFilterContext.Provider>
    </SetSearchFilterContext.Provider>
  );
};
