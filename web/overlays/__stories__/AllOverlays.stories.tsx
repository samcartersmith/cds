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
import { NavigationBar, NavigationTitle } from '../../navigation';
import { NavigationIcon } from '../../icons';
import { Pressable } from '../../system/Pressable';
import { DotStatusColor } from '../../dots';
import { Pictogram } from '../../illustrations/Pictogram';
import { FeedCard } from '../../cards/FeedCard';
import { CellMedia } from '../../cells/CellMedia';
import { TextDisplay3, TextBody } from '../../typography';
import { useToast } from '../useToast';
import { PortalProvider } from '../PortalProvider';

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
