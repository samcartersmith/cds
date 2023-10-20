import React, { useState } from 'react';
import { SearchInput } from '@cbhq/cds-web/controls/SearchInput';

export const SearchInputSheet = () => {
  const [text, setText] = useState('SearchInput');

  return (
    <div
      style={{ display: 'flex', margin: 'auto', paddingTop: 20, paddingBottom: 40, width: '40%' }}
    >
      <SearchInput
        accessibilityLabel="Search Bar"
        onChangeText={setText}
        placeholder="Placeholder"
        value={text}
      />
    </div>
  );
};
