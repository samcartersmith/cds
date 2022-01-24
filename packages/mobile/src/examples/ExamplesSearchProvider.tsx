import React, { useState } from 'react';
import { SetState } from '@cbhq/cds-common/types';
import { noop } from '@cbhq/cds-utils';

export const SearchFilterContext = React.createContext('');
export const SetSearchFilterContext = React.createContext<SetState<string>>(noop);

export const ExamplesSearchProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = useState('');

  return (
    <SetSearchFilterContext.Provider value={setFilter}>
      <SearchFilterContext.Provider value={filter}>{children}</SearchFilterContext.Provider>
    </SetSearchFilterContext.Provider>
  );
};
