import { searchInputBuilder } from '@cbhq/cds-common/internal/searchInputBuilder';
import { useRef, useState, useCallback } from 'react';
import { SearchInput } from '../SearchInput';
import { TextLabel1 } from '../../typography/TextLabel1';
import { HStack } from '../../layout/HStack';
import { IconButton } from '../../buttons/IconButton';

export default {
  title: 'Core Components/Inputs/SearchInput',
  component: SearchInput,
};

export const {
  Basic,
  Borderless,
  OnClear,
  OnSearch,
  OnFocus,
  OnBlur,
  Disabled,
  Compact,
  DisplayValue,
  HideStartIcon,
} = searchInputBuilder(SearchInput, (props) => <TextLabel1 as="p" {...props} />);

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

export const HideStartIconSearchExample = function HideStartIconSearchExample() {
  const [text, setText] = useState('');

  return (
    <HStack spacing={2} gap={1}>
      <IconButton name="backArrow" transparent />
      <SearchInput
        hideStartIcon
        value={text}
        compact
        onChangeText={setText}
        placeholder="Placeholder"
      />
    </HStack>
  );
};
