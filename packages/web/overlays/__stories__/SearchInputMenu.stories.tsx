import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
  FocusEvent,
  KeyboardEvent,
} from 'react';
import { PopoverMenuRefProps, useToggler } from '@cbhq/cds-common';
import { TextCaption, TextLabel1 } from '../../typography';
import { PopoverMenu, PopoverTrigger, MenuItem } from '../index';
import { SearchInput } from '../../controls/SearchInput';
import { SelectOption } from '../../controls/SelectOption';
import { HStack } from '../../layout/HStack';
import { Pressable } from '../../system/Pressable';
import { Icon } from '../../icons';

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
];

export const SearchInputMenu = () => {
  const [isVisible, { toggleOn: openMenu, toggleOff: closeMenu }] = useToggler(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>();
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const popoverMenuRef = useRef<PopoverMenuRefProps | null>(null);
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

  const renderOptions = useMemo(
    () => filteredOptions.map((option) => <SelectOption title={option} value={option} />),
    [filteredOptions],
  );

  const handleSearchInputPress = useCallback(() => {
    openMenu();
  }, [openMenu]);

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

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      // when using keyboard navigation and menu is focused,
      // open it once they start typing
      if (!isVisible) {
        openMenu();
      }
      // swap out selectedValue with searchValue so it becomes editable again
      if (selectedValue) {
        setSelectedValue(undefined);
      }
      if (event.key === 'ArrowDown' || event.key === 'Enter') {
        popoverMenuRef.current?.focusSelectOption();
      }
    },
    [selectedValue, setSelectedValue, openMenu, isVisible],
  );

  const handleBlur = useCallback((event: FocusEvent<HTMLElement>) => {
    popoverMenuRef.current?.handlePopoverMenuBlur(event);
  }, []);

  const ShowAllResultsButton = () => {
    return (
      <MenuItem value="" onPress={handleClear}>
        <Pressable backgroundColor="background" noScaleOnPress block onPress={handleClear}>
          <HStack alignItems="center" spacingVertical={2} spacingHorizontal={2} gap={1}>
            <TextLabel1 as="p">View all results</TextLabel1>
            <Icon size="xs" name="forwardArrow" color="foreground" />
          </HStack>
        </Pressable>
      </MenuItem>
    );
  };

  return (
    <PopoverMenu
      visible={isVisible}
      openMenu={openMenu}
      closeMenu={closeMenu}
      onChange={handleMenuChange}
      value={selectedValue}
      width="100%"
      flush
      searchEnabled
      ref={popoverMenuRef}
    >
      <PopoverTrigger>
        <SearchInput
          onChangeText={setSearchValue}
          value={selectedValue ?? searchValue ?? ''}
          width="100%"
          onClear={handleClear}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onPress={handleSearchInputPress}
        />
      </PopoverTrigger>
      {filteredOptions.length ? (
        renderOptions
      ) : (
        <HStack spacing={3}>
          <TextCaption as="p">No options were found. </TextCaption>
        </HStack>
      )}
      {shouldShowAllResultsButton ? <ShowAllResultsButton /> : null}
    </PopoverMenu>
  );
};

export default {
  title: 'Core Components/Recipes/SearchInputMenu',
  component: SearchInputMenu,
};
