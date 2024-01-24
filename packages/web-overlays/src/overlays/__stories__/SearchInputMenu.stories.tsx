import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SearchInput } from '@cbhq/cds-web/controls/SearchInput';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { Pressable } from '@cbhq/cds-web/system/Pressable';
import { TextCaption, TextLabel1 } from '@cbhq/cds-web/typography';

import { Dropdown } from '../../dropdown/Dropdown';
import { DropdownRefProps } from '../../dropdown/DropdownProps';
import { SelectOption } from '../../select/SelectOption';

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
          <Pressable block noScaleOnPress backgroundColor="background" onPress={handleClear}>
            <HStack alignItems="center" gap={1} spacingHorizontal={2} spacingVertical={2}>
              <TextLabel1 as="p">View all results</TextLabel1>
              <Icon color="foreground" name="forwardArrow" size="xs" />
            </HStack>
          </Pressable>
        ) : null}
      </>
    ),
    [filteredOptions.length, handleClear, renderOptions, shouldShowAllResultsButton],
  );

  return (
    <Dropdown
      ref={dropdownRef}
      block
      disableCloseOnOptionChange
      disableTypeFocus
      content={content}
      onChange={handleMenuChange}
      value={selectedValue}
      width="100%"
    >
      <SearchInput
        accessibilityLabel="search-input"
        onChangeText={setSearchValue}
        onClear={handleClear}
        onKeyDown={handleKeyDown}
        onPress={handleSearchInputPress}
        value={selectedValue ?? searchValue ?? ''}
        width="100%"
      />
    </Dropdown>
  );
};

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const SearchInputMenu = () => <SearchInputMenuRecipe />;

export default {
  title: 'Deprecated/SearchInputMenu',
  component: SearchInputMenu,
};
