import React, { useCallback, useState } from 'react';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';

import { Button } from '../../buttons';
import { Select } from '../../controls/Select';
import { SelectOption } from '../../controls/SelectOption';
import { Default as DropdownExample } from '../../dropdown/__stories__/Dropdown.stories';
import { DropdownProps } from '../../dropdown/DropdownProps';
import { VStack } from '../../layout';
import { DefaultSidebarExample } from '../../navigation/__stories__/NavigationStorySetup';
import { TextBody } from '../../typography/TextBody';
import { enableJavascript } from '../../utils/storybookParams/percy';
import { Alert } from '../Alert';
import { Modal } from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalBody';
import { ModalFooter } from '../Modal/ModalFooter';
import { ModalHeader } from '../Modal/ModalHeader';
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
        visible
        body="Alert body type that can run over multiple lines, but should be kept short."
        onRequestClose={handleCloseAlert}
        pictogram="warning"
        preferredActionLabel="Save"
        title="Alert title"
      />,
    );
  }, [handleCloseAlert, openAlert]);

  const handleModalTriggerPress = useCallback(() => {
    openModal(
      <Modal visible disablePortal={disablePortal} onRequestClose={closeModal}>
        <ModalHeader title="Basic Modal" />
        <ModalBody>
          <VStack gap={2}>
            <Tooltip content="I am some tooltip content" disablePortal={disablePortal}>
              <TextBody as="p">{loremIpsum}</TextBody>
            </Tooltip>
            <Button onPress={handleShowAlertButton}>Show Alert</Button>
            <Button onPress={handleShowToastButton}>Show Toast</Button>
            <DropdownExample />
            <Select
              onChange={setSelectedValue}
              placeholder="Select something... "
              value={selectedValue}
            >
              {options.map((option) => (
                <SelectOption title={option} value={option} />
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
    <DefaultSidebarExample disablePortal={disablePortal}>
      <Button onPress={handleModalTriggerPress}>Open Modal</Button>
    </DefaultSidebarExample>
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
  title: 'Recipes/All Overlays',
  component: CompositeOverlays,
};
