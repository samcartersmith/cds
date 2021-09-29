import React, { useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { ButtonBaseProps, SystemProviderProps, useToggler } from '@cbhq/cds-common';
import { ModalBaseProps, ModalFooterBaseProps } from '@cbhq/cds-common/types';
import { LoremIpsumProps } from '@cbhq/cds-web/layout/__stories__/LoremIpsum';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { usePortal } from '@cbhq/cds-common/context/PortalContext';

export type CreateModalProps = {
  Modal: React.ComponentType<ModalBaseProps>;
  ModalBody: React.ComponentType;
  ModalFooter: React.ComponentType<ModalFooterBaseProps>;
  LoremIpsum: React.ComponentType<LoremIpsumProps>;
  Button: React.ComponentType<ButtonBaseProps & { onPress?: () => void }>;
  ThemeProvider: React.ComponentType<SystemProviderProps>;
  PortalProvider: React.ComponentType<SystemProviderProps>;
  Input?: React.ComponentType<TextInputProps>;
};

export function createStories({
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Input, // test keyboard avoiding on mobile
  LoremIpsum,
  ThemeProvider,
  PortalProvider,
}: CreateModalProps) {
  const BasicModalExample: React.FC = ({ children }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler();

    return (
      <>
        <Button onPress={toggleOn}>Open Modal</Button>
        <Modal
          visible={visible}
          onClose={toggleOff}
          title="Basic Modal"
          footer={
            <ModalFooter
              PrimaryAction={<Button>Save</Button>}
              SecondaryAction={<Button variant="secondary">Cancel</Button>}
            />
          }
          zIndex={zIndex.overlays.portal}
        >
          <ModalBody>{children}</ModalBody>
        </Modal>
      </>
    );
  };

  const PortalModalExample: React.FC<{
    modalKey: string;
  }> = ({ modalKey, children }) => {
    const { addPortal, removePortal } = usePortal();

    const closeModal = useCallback(() => removePortal(modalKey), [removePortal, modalKey]);
    const showModal = useCallback(
      () =>
        addPortal(
          modalKey,
          <Modal
            visible
            onClose={closeModal}
            title="Basic Modal"
            footer={
              <ModalFooter
                PrimaryAction={<Button>Save</Button>}
                SecondaryAction={<Button variant="secondary">Cancel</Button>}
              />
            }
          >
            <ModalBody>{children}</ModalBody>
          </Modal>,
          'modal',
        ),
      [addPortal, closeModal, children, modalKey],
    );

    return <Button onPress={showModal}>Open Modal</Button>;
  };

  const BasicModal = () => (
    <BasicModalExample>
      <LoremIpsum />
    </BasicModalExample>
  );

  const DarkModal = () => (
    <ThemeProvider spectrum="dark">
      <BasicModalExample>
        <LoremIpsum />
      </BasicModalExample>
    </ThemeProvider>
  );

  const LongModal = () => (
    <BasicModalExample>
      <LoremIpsum repeat={30} />
      {!!Input && <Input placeholder="test input" />}
    </BasicModalExample>
  );

  const PortalModal = () => {
    return (
      <PortalProvider>
        <PortalModalExample modalKey="basicModal">
          <LoremIpsum />
        </PortalModalExample>
      </PortalProvider>
    );
  };

  return {
    BasicModal,
    DarkModal,
    LongModal,
    PortalModal,
  };
}
