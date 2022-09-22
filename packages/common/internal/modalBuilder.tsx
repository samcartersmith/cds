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
} from '../types';

export type CreateModalProps = {
  Modal: React.ComponentType<ModalBaseProps & { disablePortal?: boolean }>;
  ModalBody: React.ComponentType;
  ModalHeader: React.ComponentType<ModalHeaderBaseProps>;
  ModalFooter: React.ComponentType<ModalFooterBaseProps>;
  LoremIpsum: React.ComponentType<Record<string, unknown>>;
  Button: React.ComponentType<ButtonBaseProps & SharedProps & { onPress?: () => void }>;
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
}: CreateModalProps) {
  const BasicModalExample: React.FC<{
    disablePortal?: boolean;
    visible?: boolean;
    hideDividers?: boolean;
  }> = ({ children, disablePortal, visible: defaultVisible, hideDividers }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler(defaultVisible ?? true);

    return (
      <>
        <Button onPress={toggleOn}>Open Modal</Button>
        <Modal
          visible={visible}
          onRequestClose={toggleOff}
          disablePortal={disablePortal}
          hideDividers={hideDividers}
        >
          <ModalHeader title="Basic Modal" />
          <ModalBody>{children}</ModalBody>
          <ModalFooter
            primaryAction={<Button onPress={toggleOff}>Save</Button>}
            secondaryAction={
              <Button onPress={toggleOff} variant="secondary">
                Cancel
              </Button>
            }
          />
        </Modal>
      </>
    );
  };

  const PortalModalExample: React.FC = ({ children }) => {
    const { openModal, closeModal } = useModal();

    const handlePress = useCallback(
      () =>
        openModal(
          <Modal visible onRequestClose={closeModal}>
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
    const [visible, { toggleOn, toggleOff }] = useToggler(externalVisible);

    const handleClose = useCallback(() => {
      onRequestClose?.();
      toggleOff();
    }, [onRequestClose, toggleOff]);

    return (
      <>
        <Button onPress={toggleOn} testID="modal-trigger">
          Open Modal
        </Button>
        <Modal visible={visible} onRequestClose={handleClose} disablePortal>
          <ModalHeader onBackButtonPress={onBackButtonPress} title={title} />
          <ModalBody>
            <LoremIpsum />
          </ModalBody>
          <ModalFooter
            testID="modal-footer"
            primaryAction={
              <Button onPress={toggleOff} testID="modal-footer-save">
                Save
              </Button>
            }
            secondaryAction={
              <Button onPress={toggleOff} variant="secondary">
                Cancel
              </Button>
            }
          />
        </Modal>
      </>
    );
  };

  const BasicModal = () => (
    <BasicModalExample>
      <LoremIpsum />
    </BasicModalExample>
  );

  const VisibleModal = () => (
    <BasicModalExample visible>
      <LoremIpsum />
    </BasicModalExample>
  );

  const ModalWithoutPortal = () => (
    <BasicModalExample disablePortal>
      <LoremIpsum />
    </BasicModalExample>
  );

  const LongModal = () => (
    <BasicModalExample>
      <LoremIpsum repeat={30} />
      {!!TextInput && <TextInput label="" placeholder="test input" />}
    </BasicModalExample>
  );

  const PortalModal = () => {
    return (
      <PortalModalExample>
        <LoremIpsum />
      </PortalModalExample>
    );
  };

  return {
    BasicModal,
    VisibleModal,
    ModalWithoutPortal,
    LongModal,
    PortalModal,
    MockModal,
  };
}
