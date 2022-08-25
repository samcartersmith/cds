import React, { useCallback, useState } from 'react';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';

import { Button } from '../../buttons';
import { Select, SelectOption } from '../../controls';
import { DropdownProps } from '../../dropdown';
import { Default as DropdownExample } from '../../dropdown/__stories__/Dropdown.stories';
import { VStack } from '../../layout';
import { SidebarExample } from '../../navigation/__stories__/NavigationStorySetup';
import { TextBody } from '../../typography';
import { enableJavascript } from '../../utils/storybookParams/percy';
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from '../index';
import { PortalProvider } from '../PortalProvider';
import { Tooltip } from '../Tooltip/Tooltip';
import { useAlert } from '../useAlert';
import { useModal } from '../useModal';
import { useToast } from '../useToast';

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
];

const CompositeOverlays = ({ disablePortal = false }: Pick<DropdownProps, 'disablePortal'>) => {
  const { openModal, closeModal } = useModal();
  const toast = useToast();
  const { open: openAlert, close: handleCloseAlert } = useAlert();
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleShowToastButton = useCallback(() => {
    toast.show('I am a toast');
  }, [toast]);

  const handleShowAlertButton = useCallback(() => {
    openAlert(
      <Alert
        title="Alert title"
        body="Alert body type that can run over multiple lines, but should be kept short."
        pictogram="warning"
        visible
        onRequestClose={handleCloseAlert}
        preferredActionLabel="Save"
      />,
    );
  }, [handleCloseAlert, openAlert]);

  const handleModalTriggerPress = useCallback(() => {
    openModal(
      <Modal disablePortal={disablePortal} visible onRequestClose={closeModal}>
        <ModalHeader title="Basic Modal" />
        <ModalBody>
          <VStack gap={2}>
            <Tooltip disablePortal={disablePortal} content="I am some tooltip content">
              <TextBody as="p">{loremIpsum}</TextBody>
            </Tooltip>
            <Button onPress={handleShowAlertButton}>Show Alert</Button>
            <Button onPress={handleShowToastButton}>Show Toast</Button>
            <DropdownExample />
            <Select
              onChange={setSelectedValue}
              value={selectedValue}
              placeholder="Select something... "
            >
              {options.map((option) => (
                <SelectOption value={option} title={option} />
              ))}
            </Select>
          </VStack>
        </ModalBody>
        <ModalFooter primaryAction={<Button onPress={closeModal}>Save</Button>} />
      </Modal>,
    );
  }, [
    closeModal,
    disablePortal,
    handleShowAlertButton,
    handleShowToastButton,
    openModal,
    selectedValue,
  ]);

  return (
    <SidebarExample disablePortal={disablePortal}>
      <Button onPress={handleModalTriggerPress}>Open Modal</Button>
    </SidebarExample>
  );
};
CompositeOverlays.parameters = { percy: enableJavascript };

export const CompositeOverlaysWithPortal = () => (
  <PortalProvider>
    <CompositeOverlays />
  </PortalProvider>
);
CompositeOverlaysWithPortal.parameters = { percy: enableJavascript };

export const CompositeOverlaysWithoutPortal = () => <CompositeOverlays disablePortal />;
CompositeOverlaysWithoutPortal.parameters = { percy: enableJavascript };

export default {
  title: 'Core Components/Overlays',
  component: CompositeOverlays,
};
