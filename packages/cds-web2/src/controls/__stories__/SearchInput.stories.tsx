import React, { useCallback, useState } from 'react';
import { searchInputBuilder } from '@cbhq/cds-common2/internal/searchInputBuilder';

import { VStack } from '../../layout';
import { InputIconButton } from '../InputIconButton';
import { SearchInput } from '../SearchInput';

export default {
  title: 'Core Components/Inputs/SearchInput',
  component: SearchInput,
};

const { Basic, Disabled, Compact, HideStartIcon, HideEndIcon, CustomEndNode } =
  searchInputBuilder(SearchInput);

export const Default = () => (
  <VStack gap={2}>
    <Basic />
    <Disabled />
    <Compact />
    <HideStartIcon />
    <HideEndIcon />
    <CustomEndNode
      end={
        <InputIconButton
          accessibilityHint="Warning text"
          accessibilityLabel="Warning text"
          name="warning"
          onClick={() => {}}
          testID="custom-close-iconbtn"
        />
      }
    />
  </VStack>
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
    <div>
      <SearchInput
        accessibilityLabel="Search"
        onChange={handleOnChange}
        onChangeText={setText}
        value={text}
      />
      <p>{text}</p>
    </div>
  );
};
