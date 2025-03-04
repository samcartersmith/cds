import React from 'react';
import { useKBar } from 'kbar';
import { IconButton } from '@cbhq/cds-web2/buttons';
import { Tooltip } from '@cbhq/cds-web2/overlays';

const SearchBar = () => {
  const {
    query: { toggle },
  } = useKBar();
  return (
    <Tooltip content="Click or press ⌘ + K to search or ask a question">
      <IconButton name="magnifyingGlass" onClick={toggle} />
    </Tooltip>
  );
};

export default SearchBar;
