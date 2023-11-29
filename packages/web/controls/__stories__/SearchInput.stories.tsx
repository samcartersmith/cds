import { useCallback, useState } from 'react';
import { searchInputBuilder } from '@cbhq/cds-common/internal/searchInputBuilder';

import { VStack } from '../../layout';
import { FeatureFlagProvider, ThemeProvider } from '../../system';
import { SearchInput } from '../SearchInput';

export default {
  title: 'Core Components/Inputs/SearchInput',
  component: SearchInput,
};

const { Basic, Disabled, Compact, HideStartIcon } = searchInputBuilder(SearchInput);

export const Default = () => (
  <FeatureFlagProvider frontier>
    <ThemeProvider>
      <VStack gap={2}>
        <Basic />
        <Disabled />
        <Compact />
        <HideStartIcon />
      </VStack>
    </ThemeProvider>
  </FeatureFlagProvider>
);

/**
 * This tests how the SearchInput will work when
 * onChange and onChangeText are used together
 */
export const OnChangeExample = () => {
  const [text, setText] = useState('');

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [setText],
  );

  return (
    <FeatureFlagProvider frontier>
      <ThemeProvider>
        <SearchInput
          accessibilityLabel="Search"
          onChange={handleOnChange}
          onChangeText={setText}
          value={text}
        />
        <p>{text}</p>
      </ThemeProvider>
    </FeatureFlagProvider>
  );
};
