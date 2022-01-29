import { useCallback, useRef, useState } from 'react';
import { searchInputBuilder } from '@cbhq/cds-common/internal/searchInputBuilder';

import { TextLabel1 } from '../../typography/TextLabel1';
import { SearchInput } from '../SearchInput';

export default {
  title: 'Core Components/Inputs/SearchInput',
  component: SearchInput,
};

export const { Basic, OnClear, OnSearch, OnFocus, OnBlur, Disabled, Compact, DisplayValue } =
  searchInputBuilder(SearchInput, (props) => <TextLabel1 as="p" {...props} />);

export const CustomRef = () => {
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

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [setText],
  );

  return (
    <>
      <SearchInput value={text} onChange={handleOnChange} onChangeText={setText} />
      <p>{text}</p>
    </>
  );
};
