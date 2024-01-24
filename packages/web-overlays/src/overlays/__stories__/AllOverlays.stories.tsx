import React, { useCallback, useState } from 'react';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';
import { Button } from '@cbhq/cds-web/buttons';
import { VStack } from '@cbhq/cds-web/layout';
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from '@cbhq/cds-web/overlays';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { useAlert } from '@cbhq/cds-web/overlays/useAlert';
import { useModal } from '@cbhq/cds-web/overlays/useModal';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { TextBody } from '@cbhq/cds-web/typography';
import { enableJavascript } from '@cbhq/cds-web/utils/storybookParams/percy';

import { Default as DropdownExample } from '../../dropdown/__stories__/Dropdown.stories';
import { DropdownProps } from '../../dropdown/DropdownProps';
import { SidebarExample } from '../../navigation/__stories__/NavigationStorySetup';
import { Select } from '../../select/Select';
import { SelectOption } from '../../select/SelectOption';
import { Tooltip } from '../../tooltip/Tooltip';

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
    <SidebarExample disablePortal={disablePortal}>
      <Button onPress={handleModalTriggerPress}>Open Modal</Button>
    </SidebarExample>
  );
};
CompositeOverlays.parameters = { percy: enableJavascript };

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const CompositeOverlaysWithPortal = () => (
  <PortalProvider>
    <CompositeOverlays />
  </PortalProvider>
);
CompositeOverlaysWithPortal.parameters = { percy: enableJavascript };

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const CompositeOverlaysWithoutPortal = () => <CompositeOverlays disablePortal />;
CompositeOverlaysWithoutPortal.parameters = { percy: enableJavascript };

export default {
  title: 'Deprecated/All Overlays',
  component: CompositeOverlays,
};
