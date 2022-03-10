import React, { useCallback, useState } from 'react';
import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
import { SelectOption } from '@cbhq/cds-web/controls/SelectOption';
import { VStack } from '@cbhq/cds-web/layout';
import { PopoverMenu, PopoverTrigger } from '@cbhq/cds-web/overlays';
import { useToggler } from '@cbhq/cds-common';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

const PopoverMenuExample = () => {
  const [isMenuVisible, toggleMenuVisibility] = useToggler(true);
  const [value, setValue] = useState<string>('');
  const handleMenuChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
    },
    [setValue],
  );
  return (
    <VStack spacingBottom={4}>
      <VStack
        background="backgroundAlternate"
        borderRadius="standard"
        minHeight={450}
        spacingStart={10}
        spacingTop={5}
        width="100%"
      >
        <PopoverMenu
          onChange={handleMenuChange}
          value={value}
          visible={isMenuVisible}
          openMenu={toggleMenuVisibility.toggleOn}
          closeMenu={toggleMenuVisibility.toggleOff}
          width={300}
        >
          <PopoverTrigger>
            <IconButton variant="secondary" name="more" />
          </PopoverTrigger>
          {options.map((option) => (
            <SelectOption value={option} description={option} />
          ))}
        </PopoverMenu>
      </VStack>
    </VStack>
  );
};

PopoverMenuExample.displayName = 'PopoverMenuExample';

export default PopoverMenuExample;
