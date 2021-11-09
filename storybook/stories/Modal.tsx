import React, { useCallback } from 'react';
import type { TextInputProps } from 'react-native';
import { ButtonBaseProps, SystemProviderProps, useToggler } from '@cbhq/cds-common';
import type {
  ModalBaseProps,
  ModalHeaderBaseProps,
  ModalFooterBaseProps,
  SharedProps,
} from '@cbhq/cds-common/types';
import { useModal } from '@cbhq/cds-common/overlays/useModal';

export type CreateModalProps = {
  Modal: React.ComponentType<ModalBaseProps & { disablePortal?: boolean }>;
  ModalBody: React.ComponentType;
  ModalHeader: React.ComponentType<ModalHeaderBaseProps>;
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
  ModalHeader,
  ModalFooter,
  Button,
  Input, // test keyboard avoiding on mobile
  LoremIpsum,
  ThemeProvider,
  PortalProvider,
}: CreateModalProps) {
  const BasicModalExample: React.FC<{ disablePortal?: boolean }> = ({
    children,
    disablePortal,
  }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler();

    return (
      <>
        <Button onPress={toggleOn}>Open Modal</Button>
        <Modal visible={visible} onRequestClose={toggleOff} disablePortal={disablePortal}>
          {({ closeModal }) => (
            <>
              <ModalHeader title="Basic Modal" />
              <ModalBody>{children}</ModalBody>
              <ModalFooter
                primaryAction={<Button onPress={closeModal}>Save</Button>}
                secondaryAction={
                  <Button onPress={closeModal} variant="secondary">
                    Cancel
                  </Button>
                }
              />
            </>
          )}
        </Modal>
      </>
    );
  };

  const PortalModalExample: React.FC = ({ children }) => {
    const { openModal, closeModal } = useModal();

    const handlePress = useCallback(
      () =>
        openModal(
          <Modal
            visible
            onRequestClose={() => {
              console.log('close modal');
            }}
          >
            <ModalHeader title="Basic Modal" />
            <ModalBody>{children}</ModalBody>
            <ModalFooter
              primaryAction={<Button onPress={closeModal}>Save</Button>}
              secondaryAction={
                <Button onPress={closeModal} variant="secondary">
                  Cancel
                </Button>
              }
            />
          </Modal>,
        ),
      [openModal, closeModal, children],
    );

    return <Button onPress={handlePress}>Open Modal</Button>;
  };

  const MockModal: React.FC<Partial<ModalBaseProps & ModalHeaderBaseProps>> = ({
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
          disablePortal
        >
          {({ closeModal }) => (
            <>
              <ModalHeader onBackButtonPress={onBackButtonPress} title={title} />
              <ModalBody>
                <LoremIpsum />
              </ModalBody>
              <ModalFooter
                testID="modal-footer"
                primaryAction={
                  <Button onPress={closeModal} testID="modal-footer-save">
                    Save
                  </Button>
                }
                secondaryAction={
                  <Button onPress={closeModal} variant="secondary">
                    Cancel
                  </Button>
                }
              />
            </>
          )}
        </Modal>
      </>
    );
  };

  const BasicModal = () => (
    <PortalProvider>
      <BasicModalExample>
        <LoremIpsum />
      </BasicModalExample>
    </PortalProvider>
  );

  const ModalWithoutPortal = () => (
    <PortalProvider>
      <BasicModalExample disablePortal>
        <LoremIpsum />
      </BasicModalExample>
    </PortalProvider>
  );

  const DarkModal = () => (
    <ThemeProvider spectrum="dark">
      <PortalProvider>
        <BasicModalExample>
          <LoremIpsum />
        </BasicModalExample>
      </PortalProvider>
    </ThemeProvider>
  );

  const LongModal = () => (
    <PortalProvider>
      <BasicModalExample>
        <LoremIpsum repeat={30} />
        {!!Input && <Input placeholder="test input" />}
      </BasicModalExample>
    </PortalProvider>
  );

  const PortalModal = () => {
    return (
      <PortalProvider>
        <PortalModalExample>
          <LoremIpsum />
        </PortalModalExample>
      </PortalProvider>
    );
  };

  return {
    BasicModal,
    ModalWithoutPortal,
    DarkModal,
    LongModal,
    PortalModal,
    MockModal,
  };
}
