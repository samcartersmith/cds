import React, { useCallback } from 'react';
import { alertBuilder, CreateAlertProps } from '@cbhq/cds-common/src/internal/alertBuilder';
import { useAlert } from '@cbhq/cds-common/src/overlays/useAlert';
import { useModal } from '@cbhq/cds-common/src/overlays/useModal';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { ThemeProvider } from '../../system/ThemeProvider';
import { TextBody } from '../../typography/TextBody';
import { Alert } from '../Alert';
import { Modal } from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalBody';
import { ModalFooter } from '../Modal/ModalFooter';
import { PortalProvider } from '../PortalProvider';

const { BasicAlert, SingleActionAlert, PortalAlert } = alertBuilder({
  Alert,
  ThemeProvider,
  Button,
  PortalProvider,
} as CreateAlertProps);

const AlertScreen = () => {
  // demo multiple modals inside portal provider, mobile only
  const AlertOnModal = () => {
    const { openModal, closeModal } = useModal();
    const alert = useAlert();

    // eslint-disable-next-line no-console
    const handlePrimaryActionPress = () => console.log('primary pressed');

    const showAlert = useCallback(
      () =>
        alert.open(
          <Alert
            visible
            title="Alert title"
            body="Alert body type that can run over multiple lines, but should be kept short."
            pictogram="warning"
            preferredActionLabel="Primary"
            onPreferredActionPress={handlePrimaryActionPress}
          />,
        ),
      [alert],
    );

    const close = useCallback(() => closeModal(), [closeModal]);

    const handlePress = useCallback(() => {
      openModal(
        <Modal visible>
          <ModalBody>
            <TextBody>Test Modal</TextBody>
          </ModalBody>
          <ModalFooter
            primaryAction={<Button onPress={showAlert}>Show Alert</Button>}
            secondaryAction={<Button onPress={close}>Cancel</Button>}
          />
        </Modal>,
      );
    }, [close, openModal, showAlert]);

    return <Button onPress={handlePress}>Open Modal</Button>;
  };

  return (
    <ExampleScreen>
      <Example title="Basic Alert">
        <BasicAlert />
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
