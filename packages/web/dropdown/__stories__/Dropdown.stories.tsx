import React, { useCallback, useMemo, useRef, useState } from 'react';

import { Button, IconButton } from '../../buttons';
import { SelectOption } from '../../controls/SelectOption';
import { DotCount } from '../../dots';
import { useA11yControlledVisibility } from '../../hooks/useA11yControlledVisibility';
import { Icon } from '../../icons';
import { HStack } from '../../layout';
import { PopoverContentPositionConfig } from '../../overlays/popover/PopoverProps';
import { Pressable } from '../../system/Pressable';
import { PressableOpacity } from '../../system/PressableOpacity';
import { TextBody } from '../../typography/TextBody';
import { TextCaption } from '../../typography/TextCaption';
import { TextHeadline } from '../../typography/TextHeadline';
import { TextTitle2 } from '../../typography/TextTitle2';
import { Dropdown } from '../Dropdown';
import { DropdownProps, DropdownRefProps } from '../DropdownProps';
import { MenuItem } from '../MenuItem';

export default {
  title: 'Core Components/Dropdown/Dropdown',
  component: Dropdown,
};

const defaultOptions = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
  'Option 8',
  'Option 9',
  'Option 10',
  'Option 11',
];

type MockDropdownProps = {
  subjectTestID?: string;
  options?: string[];
  containerHeight?: number | string;
  customAriaControlsID?: string;
} & Pick<
  DropdownProps,
  | 'enableMobileModal'
  | 'showOverlay'
  | 'testID'
  | 'onBlur'
  | 'onCloseMenu'
  | 'disablePortal'
  | 'disabled'
  | 'value'
>;

export const Default = ({
  options = defaultOptions,
  containerHeight,
  disabled,
  subjectTestID,
  customAriaControlsID,
  ...props
}: MockDropdownProps) => {
  const [value, setValue] = useState('');
  const dropdownRef = useRef<DropdownRefProps>(null);
  const [visible, setVisible] = useState(false);
  const { triggerAccessibilityProps, controlledElementAccessibilityProps } =
    useA11yControlledVisibility(visible, {
      accessibilityLabel: 'Default Dropdown',
      hasPopupType: 'menu',
    });

  // Passing static value to aria-controls for testing dropdown interactive story
  if (customAriaControlsID) {
    triggerAccessibilityProps['aria-controls'] = customAriaControlsID;
    controlledElementAccessibilityProps.id = customAriaControlsID;
  }

  const handleCloseMenu = useCallback(() => {
    setVisible(false);
  }, []);
  const handleOpenMenu = useCallback(() => {
    setVisible(true);
  }, []);

  const content = (
    <>
      <HStack role="separator" spacingHorizontal={2} spacingVertical={2}>
        <TextCaption as="h2" color="foregroundMuted">
          Section Heading
        </TextCaption>
      </HStack>
      {options.map((option) => (
        <SelectOption key={option} testID={`option-${option}`} title={option} value={option} />
      ))}
    </>
  );

  const handleButtonPress = useCallback(() => {
    dropdownRef.current?.openMenu();
  }, []);

  return (
    <HStack gap={3} height={containerHeight} spacing={4}>
      <Dropdown
        ref={dropdownRef}
        content={content}
        controlledElementAccessibilityProps={controlledElementAccessibilityProps}
        disabled={disabled}
        onChange={setValue}
        onCloseMenu={handleCloseMenu}
        onOpenMenu={handleOpenMenu}
        value={value}
        {...props}
      >
        <IconButton
          transparent
          accessibilityLabel="More"
          disabled={disabled}
          name="more"
          testID={subjectTestID}
          variant="secondary"
          {...triggerAccessibilityProps}
        />
      </Dropdown>
      <Button onPress={handleButtonPress} {...triggerAccessibilityProps}>
        Open Menu
      </Button>
    </HStack>
  );
};

const BaseWrapped = ({ enableMobileModal }: { enableMobileModal?: boolean }) => {
  const [value, setValue] = useState('');

  const content = (
    <>
      <HStack spacingHorizontal={2} spacingVertical={2}>
        <TextCaption as="h2" color="foregroundMuted">
          Section Heading
        </TextCaption>
      </HStack>
      {defaultOptions.map((option) => (
        <SelectOption key={option} testID={`option-${option}`} title={option} value={option} />
      ))}
    </>
  );

  return (
    <HStack spacing={4}>
      <Dropdown
        content={content}
        enableMobileModal={enableMobileModal}
        onChange={setValue}
        value={value}
      >
        <DotCount count={4} pin="top-end">
          <IconButton transparent accessibilityLabel="More" name="more" variant="secondary" />
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
        {defaultOptions.slice(2, 6).map((option) => (
          <SelectOption key={option} testID={`option-${option}`} title={option} value={option} />
        ))}
      </>
    ),
    [],
  );

  const content = useMemo(
    () => (
      <>
        <HStack spacingHorizontal={2} spacingVertical={2}>
          <TextCaption as="h2" color="foregroundMuted">
            Section Heading
          </TextCaption>
        </HStack>
        {defaultOptions.slice(0, 2).map((option) => (
          <SelectOption key={option} testID={`option-${option}`} title={option} value={option} />
        ))}
        <Dropdown
          content={subMenuContent}
          contentPosition={subMenuPosition}
          minWidth={200}
          onChange={handleSubMenuValueChange}
          value={subMenuValue}
          width="100%"
        >
          {/* Note: you can't use a SelectOption as the trigger or else SelectProvider will think this is a menu option */}
          <Pressable background="background" width="100%">
            <HStack
              alignItems="center"
              justifyContent="space-between"
              spacingHorizontal={2}
              spacingVertical={1}
              width="100%"
            >
              <TextHeadline as="p">More</TextHeadline>
              <Icon color="foreground" name="caretRight" size="s" />
            </HStack>
          </Pressable>
        </Dropdown>
      </>
    ),
    [handleSubMenuValueChange, subMenuContent, subMenuValue],
  );

  return (
    <HStack gap={2} justifyContent="space-between" spacing={3}>
      <HStack flexGrow={1}>
        <Dropdown
          ref={menuRef}
          content={content}
          onChange={handleMenuValueChange}
          value={menuValue}
          width={200}
        >
          <IconButton accessibilityLabel="More" name="more" />
        </Dropdown>
      </HStack>
      <HStack
        alignItems="center"
        background="backgroundAlternate"
        borderRadius="rounded"
        flexGrow={3}
        justifyContent="center"
        spacing={3}
      >
        <TextBody as="p">You chose: {subMenuValue ?? menuValue}</TextBody>
      </HStack>
    </HStack>
  );
};

const emojiMap = [
  { label: 'react', glyph: '⚛️' },
  { label: 'love', glyph: '💕' },
  { label: 'mindblow', glyph: '🤯' },
  { label: 'shiny', glyph: '✨' },
  { label: 'surprised', glyph: '🥺' },
  { label: 'brick', glyph: '🧱' },
  { label: 'poop', glyph: '💩' },
  { label: 'poodle', glyph: '🐩' },
  { label: 'rocket', glyph: '🚀' },
  { label: 'phone', glyph: '☎️' },
  { label: 'dog', glyph: '🐕‍🦺' },
  { label: 'nails', glyph: '💅🏻' },
  { label: 'upsidedown', glyph: '🙃' },
  { label: 'coder', glyph: '👩🏼‍💻' },
];

export const ShowOverlay = () => <Default showOverlay />;
export const MobileModal = () => <Default enableMobileModal />;

export const CustomOptions = () => {
  const [value, onChange] = useState<string | undefined>();
  const currentGlyph = useMemo(
    () => emojiMap.find((emoji) => emoji.label === value)?.glyph ?? '😄',
    [value],
  );

  const content = useMemo(
    () => (
      <>
        <HStack spacingHorizontal={2} spacingVertical={2}>
          <TextCaption as="h2" color="foregroundMuted">
            Section Heading
          </TextCaption>
        </HStack>
        <HStack flexWrap="wrap" gap={1} spacingBottom={2} spacingHorizontal={2}>
          {emojiMap.map(({ label, glyph }) => (
            <MenuItem value={label}>
              <TextTitle2 as="p">{glyph}</TextTitle2>
            </MenuItem>
          ))}
        </HStack>
      </>
    ),
    [],
  );

  return (
    <Dropdown content={content} maxWidth={190} onChange={onChange} value={value}>
      <PressableOpacity>
        <TextTitle2 as="p">{currentGlyph}</TextTitle2>
      </PressableOpacity>
    </Dropdown>
  );
};

export const Disabled = () => (
  <>
    <Default />
    <Default disabled enableMobileModal />
  </>
);
