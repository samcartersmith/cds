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
    <HStack alignItems="center" gap={3} dangerouslySetClassName="search">
      <TextInput
        width={200}
        borderRadius="search"
        start={<InputIcon name="search" />}
        end={
          <HStack spacingEnd={2}>
            <kbd style={kbdStyles}>⌘</kbd>
            <kbd style={kbdStyles}>K</kbd>
          </HStack>
        }
        bordered={false}
        compact
        placeholder="Search"
        onFocus={handleOnPress}
      />
    </HStack>
  );
});

export default SearchBar;
