import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { SearchInput } from '../../controls/SearchInput';
import { SelectOption } from '../../controls/SelectOption';
import { Dropdown, DropdownRefProps } from '../../dropdown';
import { Icon } from '../../icons';
import { HStack } from '../../layout/HStack';
import { Pressable } from '../../system/Pressable';
import { TextCaption, TextLabel1 } from '../../typography';

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
];

const SearchInputMenuRecipe = () => {
  const dropdownRef = useRef<DropdownRefProps>(null);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>();
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const shouldShowAllResultsButton =
    filteredOptions.length && filteredOptions.length < options.length;

  const filterOptions = useMemo(
    () =>
      !searchValue
        ? options
        : options.filter(
            (option) =>
              searchValue &&
              typeof searchValue === 'string' &&
              option.toLowerCase().includes(searchValue.toLowerCase()),
          ),
    [searchValue],
  );

  useEffect(() => {
    setFilteredOptions(filterOptions);
  }, [filterOptions]);

  const handleSearchInputPress = useCallback(() => {
    dropdownRef.current?.openMenu();
  }, []);

  const handleClear = useCallback(() => {
    setSelectedValue(undefined);
    setSearchValue(undefined);
  }, [setSelectedValue]);

  const handleMenuChange = useCallback(
    (newValue: string) => {
      setSelectedValue(newValue);
      setSearchValue(newValue);
    },
    [setSearchValue, setSelectedValue],
  );

  const renderOptions = useMemo(
    () => filteredOptions.map((option) => <SelectOption title={option} value={option} />),
    [filteredOptions],
  );

  const handleKeyDown = useCallback(() => {
    // when using keyboard navigation and menu is focused,
    // open it once they start typing
    if (!searchValue) {
      dropdownRef.current?.openMenu();
    }
    // swap out selectedValue with searchValue so it becomes editable again
    if (selectedValue) {
      setSelectedValue(undefined);
    }
  }, [searchValue, selectedValue]);

  const content = useMemo(
    () => (
      <>
        {filteredOptions.length ? (
          renderOptions
        ) : (
          <HStack spacing={3}>
            <TextCaption as="p">No options were found. </TextCaption>
          </HStack>
        )}
        {shouldShowAllResultsButton ? (
          <Pressable backgroundColor="background" noScaleOnPress block onPress={handleClear}>
            <HStack alignItems="center" spacingVertical={2} spacingHorizontal={2} gap={1}>
              <TextLabel1 as="p">View all results</TextLabel1>
              <Icon size="xs" name="forwardArrow" color="foreground" />
            </HStack>
          </Pressable>
        ) : null}
      </>
    ),
    [filteredOptions.length, handleClear, renderOptions, shouldShowAllResultsButton],
  );

  return (
    <Dropdown
      value={selectedValue}
      onChange={handleMenuChange}
      width="100%"
      enableSearch
      block
      disableCloseOnOptionChange
      ref={dropdownRef}
      content={content}
    >
      <SearchInput
        onChangeText={setSearchValue}
        value={selectedValue ?? searchValue ?? ''}
        width="100%"
        onClear={handleClear}
        onKeyDown={handleKeyDown}
        onPress={handleSearchInputPress}
      />
    </Dropdown>
  );
};

export const SearchInputMenu = () => <SearchInputMenuRecipe />;

export default {
  title: 'Core Components/Recipes/SearchInputMenu',
  component: SearchInputMenu,
};
