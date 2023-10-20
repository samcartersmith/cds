import React, { useCallback } from 'react';
import { alertBuilder, CreateAlertProps } from '@cbhq/cds-common/internal/alertBuilder';
import { useAlert } from '@cbhq/cds-common/overlays/useAlert';
import { useModal } from '@cbhq/cds-common/overlays/useModal';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextBody } from '../../typography/TextBody';
import { Alert } from '../Alert';
import { Modal } from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalBody';
import { ModalFooter } from '../Modal/ModalFooter';
import { PortalProvider } from '../PortalProvider';

const { BasicAlert, LongTitleAlert, SingleActionAlert, PortalAlert } = alertBuilder({
  Alert,
  Button,
  PortalProvider,
} as CreateAlertProps);

const AlertOnModal = () => {
  const { openModal, closeModal } = useModal();
  const { open, close } = useAlert();

  const showAlert = useCallback(
    () =>
      open(
        <Alert
          visible
          body="Alert body type that can run over multiple lines, but should be kept short."
          onPreferredActionPress={close}
          onRequestClose={close}
          pictogram="warning"
          preferredActionLabel="Primary"
          title="Alert title"
        />,
      ),
    [open, close],
  );

  const handlePress = useCallback(() => {
    openModal(
      <Modal visible onRequestClose={closeModal}>
        <ModalBody>
          <TextBody>Test Modal</TextBody>
        </ModalBody>
        <ModalFooter
          primaryAction={<Button onPress={showAlert}>Show Alert</Button>}
          secondaryAction={<Button onPress={closeModal}>Cancel</Button>}
        />
      </Modal>,
    );
  }, [closeModal, openModal, showAlert]);

  return <Button onPress={handlePress}>Open Modal</Button>;
};

const AlertScreen = () => {
  // demo multiple modals inside portal provider, mobile only
  return (
    <ExampleScreen>
      <Example title="Basic Alert">
        <BasicAlert />
      </Example>
      <Example title="Long Title Alert">
        <LongTitleAlert />
      </Example>
      <Example title="Single Action Alert">
        <SingleActionAlert />
      </Example>
      <Example title="Portal Alert">
        <PortalAlert />
      </Example>
      <Example title="Alert over Modal (Multiple Modals)">
        <AlertOnModal />
      </Example>
    </ExampleScreen>
  );
};

export default AlertScreen;
