import React, { useCallback } from 'react';
import { useWindowSizeWithBreakpointOverride } from '@site/src/utils/useWindowSizeWithBreakpointOverride';
import { useKBar } from 'kbar';
import { IconButton } from '@cbhq/cds-web2/buttons';
import { SearchInput } from '@cbhq/cds-web2/controls/SearchInput';
import { HStack } from '@cbhq/cds-web2/layout';
import { Text } from '@cbhq/cds-web2/text/Text';

import styles from './styles.module.css';

// temporary noop function, will remove once search modal is implemented
const noop = () => {};

const SearchBar = () => {
  const size = useWindowSizeWithBreakpointOverride();
  const { query } = useKBar();
  const handleOnClick = useCallback(() => {
    query.toggle();
  }, [query]);
  if (size === 'desktop') {
    return (
      <SearchInput
        compact
        bordered={false}
        end={
          <HStack alignItems="center" flexShrink={0} gap={1} paddingRight={2}>
            <Text mono as="kbd" className={styles.kbd}>
              ⌘
            </Text>
            <Text mono as="kbd" className={styles.kbd}>
              K
            </Text>
          </HStack>
        }
        onChangeText={noop}
        onClick={handleOnClick}
        placeholder="Search or ask a question"
        startIcon="search"
        value=""
        width={375}
      />
    );
  }
  return <IconButton name="magnifyingGlass" onClick={handleOnClick} />;
};

export default SearchBar;
