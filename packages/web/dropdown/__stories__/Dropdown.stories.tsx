import { useCallback, useMemo, useRef, useState } from 'react';

import { Button, IconButton } from '../../buttons';
import { SelectOption } from '../../controls/SelectOption';
import { DotCount } from '../../dots';
import { Icon } from '../../icons';
import { HStack } from '../../layout';
import { PopoverContentPositionConfig } from '../../overlays/popover/PopoverProps';
import { SectionTitle } from '../../overlays/PopoverMenu/SectionTitle';
import { Pressable } from '../../system';
import { TextBody, TextHeadline } from '../../typography';
import { Dropdown } from '../Dropdown';
import { DropdownProps, DropdownRefProps } from '../DropdownProps';

export default {
  title: 'Core Components/Dropdown',
  component: Dropdown,
};

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
];

type MockDropdownProps = {
  subjectTestID?: string;
} & Pick<DropdownProps, 'enableMobileModal' | 'showOverlay' | 'testID' | 'onBlur'>;

export const Default = (props: MockDropdownProps) => {
  const [value, setValue] = useState('');
  const dropdownRef = useRef<DropdownRefProps>(null);

  const content = (
    <>
      <SectionTitle text="Section Heading" />
      {options.map((option) => (
        <SelectOption value={option} key={option} title={option} testID={`option-${option}`} />
      ))}
    </>
  );

  const handleButtonPress = useCallback(() => {
    dropdownRef.current?.openMenu();
  }, []);

  return (
    <HStack gap={3} spacing={4}>
      <Dropdown ref={dropdownRef} onChange={setValue} content={content} value={value} {...props}>
        <IconButton name="more" variant="secondary" transparent testID={props.subjectTestID} />
      </Dropdown>
      <Button onPress={handleButtonPress}>Open Menu</Button>
    </HStack>
  );
};

const BaseWrapped = ({ enableMobileModal }: { enableMobileModal?: boolean }) => {
  const [value, setValue] = useState('');

  const content = (
    <>
      <SectionTitle text="Section Heading" />
      {options.map((option) => (
        <SelectOption value={option} key={option} title={option} testID={`option-${option}`} />
      ))}
    </>
  );

  return (
    <HStack spacing={4}>
      <Dropdown
        onChange={setValue}
        content={content}
        value={value}
        enableMobileModal={enableMobileModal}
      >
        <DotCount count={4} pin="top-end">
          <IconButton name="more" variant="secondary" transparent />
        </DotCount>
      </Dropdown>
    </HStack>
  );
};

export const Wrapped = () => <BaseWrapped />;

export const WrappedMobileModal = () => <BaseWrapped enableMobileModal />;

const subMenuPosition: PopoverContentPositionConfig = {
  gap: 1,
  placement: 'right-start',
};

export const SubMenu = () => {
  const [menuValue, setMenuValue] = useState<string>();
  const [subMenuValue, setSubMenuValue] = useState<string>();
  const menuRef = useRef<DropdownRefProps>(null);

  const handleMenuValueChange = useCallback((newValue: string) => {
    setMenuValue(newValue);
    setSubMenuValue(undefined);
  }, []);

  const handleSubMenuValueChange = useCallback((newValue: string) => {
    setSubMenuValue(newValue);
    setMenuValue(undefined);
  }, []);

  const subMenuContent = useMemo(
    () => (
      <>
        {options.slice(2, 6).map((option) => (
          <SelectOption value={option} key={option} title={option} testID={`option-${option}`} />
        ))}
      </>
    ),
    [],
  );

  const content = useMemo(
    () => (
      <>
        <SectionTitle text="Section 1" />
        {options.slice(0, 2).map((option) => (
          <SelectOption value={option} key={option} title={option} testID={`option-${option}`} />
        ))}
        <Dropdown
          content={subMenuContent}
          onChange={handleSubMenuValueChange}
          value={subMenuValue}
          contentPosition={subMenuPosition}
          width="100%"
          minWidth={200}
        >
          {/* Note: you can't use a SelectOption as the trigger or else SelectProvider will think this is a menu option */}
          <Pressable backgroundColor="background" width="100%">
            <HStack
              justifyContent="space-between"
              alignItems="center"
              spacingVertical={1}
              width="100%"
              spacingHorizontal={2}
            >
              <TextHeadline as="p">More</TextHeadline>
              <Icon size="s" name="caretRight" color="foreground" />
            </HStack>
          </Pressable>
        </Dropdown>
      </>
    ),
    [handleSubMenuValueChange, subMenuContent, subMenuValue],
  );

  return (
    <HStack spacing={3} justifyContent="space-between" gap={2}>
      <HStack flexGrow={1}>
        <Dropdown
          ref={menuRef}
          width={200}
          content={content}
          onChange={handleMenuValueChange}
          value={menuValue}
        >
          <IconButton name="more" />
        </Dropdown>
      </HStack>
      <HStack
        background="backgroundAlternate"
        borderRadius="standard"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        flexGrow={3}
      >
        <TextBody as="p">You chose: {subMenuValue ?? menuValue}</TextBody>
      </HStack>
    </HStack>
  );
};

export const ShowOverlay = () => <Default showOverlay />;
export const MobileModal = () => <Default enableMobileModal />;
