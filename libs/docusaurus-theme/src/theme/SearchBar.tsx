import React, { memo, useCallback } from 'react';
import { useKBar } from 'kbar';
import { InputIcon, TextInput } from '@cbhq/cds-web/controls';
import { HStack } from '@cbhq/cds-web/layout';
import { spacing } from '@cbhq/cds-web/tokens';

const kbdStyles = {
  padding: '0 0 2px',
  borderColor: 'var(--line)',
  boxShadow: 'none',
  borderRadius: '3px',
  height: 18,
  width: 20,
  marginRight: spacing[0.5],
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
};

const SearchBar = memo(function SearchBar() {
  const { query } = useKBar();
  const handleOnPress = useCallback(() => {
    query.toggle();
  }, [query]);

  return (
    <HStack alignItems="center" className="search" gap={3}>
      <TextInput
        bordered
        compact
        borderRadius="roundedFull"
        end={
          <HStack spacingEnd={2}>
            <kbd style={kbdStyles}>⌘</kbd>
            <kbd style={kbdStyles}>K</kbd>
          </HStack>
        }
        onFocus={handleOnPress}
        placeholder="Search"
        start={<InputIcon name="search" />}
        width={200}
      />
    </HStack>
  );
});

export default SearchBar;
