import React, { useCallback, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { searchInputBuilder } from '@cbhq/cds-common/internal/searchInputBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextLabel1 } from '../../typography/TextLabel1';
import { SearchInput } from '../SearchInput';

const {
  Basic,
  OnBlur,
  OnFocus,
  OnClear,
  OnSearch,
  Disabled,
  Compact,
  DisplayValue,
  HideStartIcon,
} = searchInputBuilder(SearchInput, TextLabel1);

const CustomRef = () => {
  const ref = useRef(null);

  const [text, setText] = useState('');

  return <SearchInput ref={ref} onChangeText={setText} value={text} />;
};

/**
 * This tests how the SearchInput will work when
 * onChange and onChangeText are used together
 */
export const OnChangeExample = () => {
  const [text, setText] = useState('');

  const handleOnChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    console.log(e.nativeEvent.text);
  }, []);

  const handleOnBack = useCallback(() => {
    console.log('onBack callback fired');
  }, []);

  return (
    <>
      <SearchInput
        onBack={handleOnBack}
        onChange={handleOnChange}
        onChangeText={setText}
        value={text}
      />
      <TextLabel1>{text}</TextLabel1>
    </>
  );
};

export const DisableBackArrow = () => {
  const [text, setText] = useState('');

  const handleOnSearch = useCallback((str: string) => {
    console.log(str);
  }, []);

  return (
    <>
      <SearchInput disableBackArrow onChangeText={setText} onSearch={handleOnSearch} value={text} />
      <TextLabel1>{text}</TextLabel1>
    </>
  );
};

const SetCustomSearchStartIcon = () => {
  const [text, setText] = useState('');

  const handleOnSearch = useCallback((str: string) => {
    console.log(str);
  }, []);

  return (
    <>
      <SearchInput
        onChangeText={setText}
        onSearch={handleOnSearch}
        startIcon="search"
        value={text}
      />
      <TextLabel1>{text}</TextLabel1>
    </>
  );
};

const SetCustomBackArrowStartIcon = () => {
  const [text, setText] = useState('');

  const handleOnSearch = useCallback((str: string) => {
    console.log(str);
  }, []);

  return (
    <>
      <SearchInput
        onChangeText={setText}
        onSearch={handleOnSearch}
        startIcon="backArrow"
        value={text}
      />
      <TextLabel1>{text}</TextLabel1>
    </>
  );
};

const SearchInputScreen = () => {
  return (
    <ExampleScreen>
      <Example title="OnChangeExample">
        <OnChangeExample />
      </Example>
      <Example title="hideStartIcon">
        <HideStartIcon />
      </Example>
      <Example title="Set disableBackArrow=true">
        <DisableBackArrow />
      </Example>
      <Example title="Basic">
        <Basic />
      </Example>
      <Example title="OnBlur">
        <OnBlur />
      </Example>
      <Example title="OnFocus">
        <OnFocus />
      </Example>
      <Example title="OnClear">
        <OnClear />
      </Example>
      <Example title="OnSearch">
        <OnSearch />
      </Example>
      <Example title="Disabled">
        <Disabled />
      </Example>
      <Example title="Custom Ref">
        <CustomRef />
      </Example>
      <Example title="Compact">
        <Compact />
      </Example>
      <Example title="DisplayValue">
        <DisplayValue />
      </Example>
      <Example title="Custom Start Icon - Search">
        <SetCustomSearchStartIcon />
      </Example>
      <Example title="Custom Start Icon - Back arrow">
        <SetCustomBackArrowStartIcon />
      </Example>
    </ExampleScreen>
  );
};

export default SearchInputScreen;
