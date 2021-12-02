import React, { useCallback } from 'react';
import { Button } from '@cbhq/cds-mobile/buttons';
import { Alert, Modal, ModalBody, ModalFooter } from '@cbhq/cds-mobile/overlays';
import { useModal } from '@cbhq/cds-common/overlays/useModal';
import { useAlert } from '@cbhq/cds-common/overlays/useAlert';
import { ThemeProvider } from '@cbhq/cds-mobile/system';
import { PortalProvider } from '@cbhq/cds-mobile/overlays/PortalProvider';
import { TextBody } from '@cbhq/cds-mobile/typography';
import { CreateAlertProps, createStories } from ':cds-storybook/stories/Alert';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

const { BasicAlert, SingleActionAlert, PortalAlert } = createStories({
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
    <ExamplesScreen>
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
    </ExamplesScreen>
  );
};

export default AlertScreen;
