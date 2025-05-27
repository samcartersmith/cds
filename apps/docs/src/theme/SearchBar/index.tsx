import React from 'react';
import { useKBar } from 'kbar';
import { IconButton } from '@cbhq/cds-web/buttons';
import { Tooltip } from '@cbhq/cds-web/overlays';

const SearchBar = () => {
  const {
    query: { toggle },
  } = useKBar();
  return (
    <Tooltip content="Click or press ⌘ + K to search or ask a question">
      <IconButton accessibilityLabel="Search" name="magnifyingGlass" onClick={toggle} />
    </Tooltip>
  );
};

export default SearchBar;
