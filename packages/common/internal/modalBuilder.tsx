import React, { useCallback } from 'react';

import { useToggler } from '../hooks/useToggler';
import { useModal } from '../overlays/useModal';
import type {
  ButtonBaseProps,
  ModalBaseProps,
  ModalFooterBaseProps,
  ModalHeaderBaseProps,
  SharedProps,
  TextInputBaseProps,
  ThemeProviderBaseProps,
} from '../types';

const onRequestCloseConsole = () => console.log('close modal');

export type CreateModalProps = {
  Modal: React.ComponentType<ModalBaseProps & { disablePortal?: boolean }>;
  ModalBody: React.ComponentType;
  ModalHeader: React.ComponentType<ModalHeaderBaseProps>;
  ModalFooter: React.ComponentType<ModalFooterBaseProps>;
  LoremIpsum: React.ComponentType<Record<string, unknown>>;
  Button: React.ComponentType<ButtonBaseProps & SharedProps & { onPress?: () => void }>;
  ThemeProvider: React.ComponentType<ThemeProviderBaseProps>;
  PortalProvider: React.ComponentType<ThemeProviderBaseProps>;
  TextInput?: React.ComponentType<TextInputBaseProps>;
};

export function modalBuilder({
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  TextInput, // test keyboard avoiding on mobile
  LoremIpsum,
  ThemeProvider,
  PortalProvider,
}: CreateModalProps) {
  const BasicModalExample: React.FC<{ disablePortal?: boolean; visible?: boolean }> = ({
    children,
    disablePortal,
    visible: defaultVisible,
  }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler(defaultVisible);

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
          <Modal visible onRequestClose={onRequestCloseConsole}>
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

  const VisibleModal = () => (
    <PortalProvider>
      <BasicModalExample visible>
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
        {!!TextInput && <TextInput label="" placeholder="test input" />}
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
    VisibleModal,
    ModalWithoutPortal,
    DarkModal,
    LongModal,
    PortalModal,
    MockModal,
  };
}
