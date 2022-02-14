/* eslint-disable no-console */
import React, { useState, useRef, useCallback } from 'react';
import { searchInputBuilder } from '@cbhq/cds-common/internal/searchInputBuilder';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { SearchInput } from '../SearchInput';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextLabel1 } from '../../typography/TextLabel1';

const { Basic, OnBlur, OnFocus, OnClear, OnSearch, Disabled, Compact, DisplayValue } =
  searchInputBuilder(SearchInput, TextLabel1);

const CustomRef = () => {
  const ref = useRef(null);

  const [text, setText] = useState('');

  return <SearchInput value={text} onChangeText={setText} ref={ref} />;
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
        value={text}
        onBack={handleOnBack}
        onChange={handleOnChange}
        onChangeText={setText}
      />
      <TextLabel1>{text}</TextLabel1>
    </>
  );
};

export const DisableShowBackArrow = () => {
  const [text, setText] = useState('');

  const handleOnSearch = useCallback((str: string) => {
    console.log(str);
  }, []);

  return (
    <>
      <SearchInput value={text} disableBackArrow onSearch={handleOnSearch} onChangeText={setText} />
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
      <Example title="Set disableBackArrow=true">
        <DisableShowBackArrow />
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
    </ExampleScreen>
  );
};

export default SearchInputScreen;
