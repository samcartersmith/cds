import { useCallback, useRef, useState } from 'react';
import { searchInputBuilder } from '@cbhq/cds-common/internal/searchInputBuilder';

import { IconButton } from '../../buttons/IconButton';
import { HStack } from '../../layout/HStack';
import { TextLabel1 } from '../../typography/TextLabel1';
import { SearchInput } from '../SearchInput';

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

  return <SearchInput ref={ref} accessibilityLabel="Search" onChangeText={setText} value={text} />;
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
      <SearchInput
        accessibilityLabel="Search"
        onChange={handleOnChange}
        onChangeText={setText}
        value={text}
      />
      <p>{text}</p>
    </>
  );
};

export const HideStartIconSearchExample = function HideStartIconSearchExample() {
  const [text, setText] = useState('');

  return (
    <HStack gap={1} spacing={2}>
      <IconButton transparent accessibilityLabel="Back arrow" name="backArrow" />
      <SearchInput
        compact
        hideStartIcon
        accessibilityLabel="Search"
        onChangeText={setText}
        placeholder="Placeholder"
        value={text}
      />
    </HStack>
  );
};
