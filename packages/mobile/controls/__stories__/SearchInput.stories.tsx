import React, { useCallback, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { searchInputBuilder } from '@cbhq/cds-common/internal/searchInputBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextLabel1 } from '../../typography/TextLabel1';
import { SearchInput } from '../SearchInput';

const { Basic, Compact, HideStartIcon } = searchInputBuilder((props) => (
  <SearchInput editable={__DEV__} {...props} />
));

// can't use `Disabled` variant from searchInputBuilder because we can't set mobile specifc props,
// and we want `editable` to always be `false` or `undefined` here
const Disabled = () => {
  const [text, setText] = useState('');

  return <SearchInput disabled accessibilityLabel="Search" onChangeText={setText} value={text} />;
};

const CustomRef = () => {
  const [text, setText] = useState('');
  const ref = useRef(null);

  return <SearchInput ref={ref} editable={__DEV__} onChangeText={setText} value={text} />;
};

/**
 * This tests how the SearchInput will work when
 * onChange and onChangeText are used together
 */
const OnChangeExample = () => {
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
        editable={__DEV__}
        onBack={handleOnBack}
        onChange={handleOnChange}
        onChangeText={setText}
        value={text}
      />
      <TextLabel1>{text}</TextLabel1>
    </>
  );
};

const DisableBackArrow = () => {
  const [text, setText] = useState('');

  const handleOnSearch = useCallback((str: string) => {
    console.log(str);
  }, []);

  return (
    <>
      <SearchInput
        disableBackArrow
        editable={__DEV__}
        onChangeText={setText}
        onSearch={handleOnSearch}
        value={text}
      />
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
        editable={__DEV__}
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
        editable={__DEV__}
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
      <Example title="OnChange Example">
        <OnChangeExample />
      </Example>
      <Example title="Hidden Start Icon">
        <HideStartIcon />
      </Example>
      <Example title="Disabled Back Arrow">
        <DisableBackArrow />
      </Example>
      <Example title="Basic">
        <Basic />
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
