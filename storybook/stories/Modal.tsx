import React, { useCallback } from 'react';
import type { TextInputProps } from 'react-native';
import { ButtonBaseProps, SystemProviderProps, useToggler } from '@cbhq/cds-common';
import type { ModalBaseProps, ModalFooterBaseProps, SharedProps } from '@cbhq/cds-common/types';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { usePortal } from '@cbhq/cds-common/context/PortalContext';

export type CreateModalProps = {
  Modal: React.ComponentType<ModalBaseProps>;
  ModalBody: React.ComponentType;
  ModalFooter: React.ComponentType<ModalFooterBaseProps>;
  LoremIpsum: React.ComponentType<Record<string, unknown>>;
  Button: React.ComponentType<ButtonBaseProps & SharedProps & { onPress?: () => void }>;
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
  const BasicModalExample: React.FC = ({ children, ...props }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler();

    return (
      <>
        <Button onPress={toggleOn}>Open Modal</Button>
        <Modal
          visible={visible}
          onRequestClose={toggleOff}
          title="Basic Modal"
          footer={
            <ModalFooter
              PrimaryAction={<Button>Save</Button>}
              SecondaryAction={<Button variant="secondary">Cancel</Button>}
            />
          }
          zIndex={zIndex.overlays.portal}
          {...props}
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
            onRequestClose={closeModal}
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

  const MockModal: React.FC<Partial<ModalBaseProps>> = ({
    onRequestClose,
    onBackButtonPress,
    title = 'Basic Modal',
    visible: externalVisible,
  }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler();

    return (
      <>
        <Button onPress={toggleOn} testID="modal-trigger">
          Open Modal
        </Button>
        <Modal
          visible={externalVisible ?? visible}
          onRequestClose={onRequestClose ?? toggleOff}
          title={title}
          onBackButtonPress={onBackButtonPress}
          footer={
            <ModalFooter
              testID="modal-footer"
              PrimaryAction={<Button>Save</Button>}
              SecondaryAction={<Button variant="secondary">Cancel</Button>}
            />
          }
        >
          <ModalBody>
            <LoremIpsum />
          </ModalBody>
        </Modal>
      </>
    );
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
    BasicModalExample,
    MockModal,
  };
}
