import React, { useCallback, useState } from 'react';
import { useToggler } from '@cbhq/cds-common';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  PopoverMenu,
  PopoverTrigger,
  PopoverTriggerWrapper,
  SectionTitle,
  MenuItem,
  Alert,
} from '../index';
import { HStack, VStack, Divider } from '../../layout';
import { Button, IconButton, AvatarButton } from '../../buttons';
import { SelectOption, Select } from '../../controls';
import { popoverMenuBuilder, CreatePopoverMenuStoriesProps } from './popoverMenuBuilder';
import {
  NavigationBar,
  NavigationTitle,
  Sidebar,
  SidebarMoreMenu,
  SidebarItem,
} from '../../navigation';
import { NavigationIcon, LogoMark } from '../../icons';
import { Pressable } from '../../system/Pressable';
import { DotStatusColor } from '../../dots';
import { Pictogram } from '../../illustrations/Pictogram';
import { FeedCard } from '../../cards/FeedCard';
import { CellMedia } from '../../cells/CellMedia';
import { TextDisplay3, TextBody } from '../../typography';
import { useToast } from '../useToast';
import { PortalProvider } from '../PortalProvider';
import {
  moreMenuOptions,
  items as navigationItems,
} from '../../navigation/__stories__/NavigationStorySetup';

const { NavigationMenu, FeedCardMenu } = popoverMenuBuilder({
  PopoverMenu,
  PopoverTrigger,
  PopoverTriggerWrapper,
  VStack,
  HStack,
  SelectOption,
  MenuItem,
  IconButton,
  NavigationBar,
  NavigationTitle,
  Pictogram,
  CellMedia,
  FeedCard,
  Button,
  Divider,
  SectionTitle,
  DotStatusColor,
  AvatarButton,
  Pressable,
  NavigationIcon,
} as CreatePopoverMenuStoriesProps);

const options = ['Salad', 'Burrito', 'Sushi', 'Soup'];

const SidebarWithMoreMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuVisible, toggleMoreMenuVisibility] = useToggler(false);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);
  const moreMenuIndex = 4;

  const handleMoreMenuChange = useCallback((newValue: string) => {
    setActiveIndex(moreMenuIndex);
    setMoreMenuValue(newValue);
  }, []);

  const handleItemPress = useCallback((index: number) => {
    setActiveIndex(index);
    setMoreMenuValue(undefined);
  }, []);

  return (
    <Sidebar logo={<LogoMark />}>
      {navigationItems.slice(0, 4).map((props, index) => (
        <SidebarItem
          key={`sidebar-item--${props.title}`}
          active={index === activeIndex}
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          onPress={() => handleItemPress(index)}
          {...props}
        />
      ))}
      <SidebarMoreMenu
        onChange={handleMoreMenuChange}
        value={moreMenuValue}
        visible={moreMenuVisible}
        active={activeIndex === moreMenuIndex}
        openMenu={toggleMoreMenuVisibility.toggleOn}
        closeMenu={toggleMoreMenuVisibility.toggleOff}
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        onPress={() => setActiveIndex(moreMenuIndex)}
      >
        {moreMenuOptions.map((item) => (
          <SelectOption
            key={`sidebar-more-menu-item--${item.value}`}
            value={item.value}
            description={item.label}
            media={<NavigationIcon name={item.icon} />}
          />
        ))}
      </SidebarMoreMenu>
    </Sidebar>
  );
};

const CompositeOverlays = ({ disablePortal = false }) => {
  const [isModalVisible, toggleModalVisibility] = useToggler(false);
  const toast = useToast();
  const [isAlertVisible, toggleAlertVisibility] = useToggler(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleAlertSubmitPress = useCallback(() => {
    if (selectedValue === '') {
      return;
    }
    toast.show('Order received', {
      disablePortal,
    });
    toggleModalVisibility.toggleOff();
  }, [toast, disablePortal, toggleModalVisibility, selectedValue]);

  const handleAlertClose = useCallback(
    () => toggleAlertVisibility.toggleOff(),
    [toggleAlertVisibility],
  );

  const handleModalTriggerPress = useCallback(
    () => toggleModalVisibility.toggleOn(),
    [toggleModalVisibility],
  );

  const handleAlertTriggerPress = useCallback(() => {
    toggleAlertVisibility.toggleOn();
  }, [toggleAlertVisibility]);
  const handleSelectChange = useCallback(
    (newValue: string) => {
      setSelectedValue(newValue);
    },
    [setSelectedValue],
  );
  const handleModalClose = useCallback(
    () => toggleModalVisibility.toggleOff(),
    [toggleModalVisibility],
  );

  return (
    <HStack>
      <SidebarWithMoreMenu />
      <VStack>
        <NavigationMenu />
        <VStack spacing={3} gap={2}>
          <Button compact onPress={handleModalTriggerPress}>
            Order Lunch
          </Button>
          <FeedCardMenu />
        </VStack>
        <Modal
          visible={isModalVisible}
          onRequestClose={handleModalClose}
          disablePortal={disablePortal}
        >
          <ModalHeader>
            <TextDisplay3 as="h3">Waddup, I heard you like food</TextDisplay3>
          </ModalHeader>
          <ModalBody>
            <VStack minHeight={500} gap={2}>
              <TextBody as="p">Well, go ahead and choose</TextBody>
              <Select
                onChange={handleSelectChange}
                label="I want to eat"
                placeholder="Something else..."
                value={selectedValue}
              >
                {options.map((option) => (
                  <SelectOption value={option} description={option} />
                ))}
              </Select>
            </VStack>
          </ModalBody>
          <ModalFooter
            primaryAction={<Button onPress={handleAlertTriggerPress}>Submit my order</Button>}
          />
        </Modal>
        <Alert
          title={
            selectedValue === ''
              ? 'Nope, you have to choose something'
              : 'Are you sure you want that? '
          }
          body={
            selectedValue === ''
              ? 'Go back and choose something to eat'
              : 'Double check your answer, this is a life or death decision. '
          }
          pictogram="warning"
          visible={isAlertVisible}
          disablePortal={disablePortal}
          stacked
          preferredActionLabel="Continue"
          onPreferredActionPress={handleAlertSubmitPress}
          onRequestClose={handleAlertClose}
        />
      </VStack>
    </HStack>
  );
};

export const CompositeOverlaysWithPortal = () => (
  <PortalProvider>
    <CompositeOverlays />
  </PortalProvider>
);

export const CompositeOverlaysWithoutPortal = () => <CompositeOverlays disablePortal />;

export default {
  title: 'Core Components/Overlays',
  component: CompositeOverlays,
};
