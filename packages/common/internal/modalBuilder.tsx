import React, { RefObject, useCallback } from 'react';

import { useToggler } from '../hooks/useToggler';
import { useModal } from '../overlays/useModal';
import type {
  ButtonBaseProps,
  ModalBaseProps,
  ModalFooterBaseProps,
  ModalHeaderBaseProps,
  SharedAccessibilityProps,
  SharedProps,
  TextInputBaseProps,
} from '../types';

type ModalAccessibilityProps = Pick<
  SharedAccessibilityProps,
  'accessibilityLabelledBy' | 'accessibilityLabel'
>;

type ModalA11yProps = {
  triggerRef?: RefObject<HTMLButtonElement>;
  focusTrigger?: () => void;
} & ModalAccessibilityProps;

export type CreateModalProps = {
  Modal: React.ComponentType<
    ModalBaseProps & ModalAccessibilityProps & { disablePortal?: boolean }
  >;
  ModalBody: React.ComponentType;
  ModalHeader: React.ComponentType<ModalHeaderBaseProps>;
  ModalFooter: React.ComponentType<ModalFooterBaseProps>;
  LoremIpsum: React.ComponentType<Record<string, unknown>>;
  Button: React.ComponentType<
    ButtonBaseProps &
      SharedProps & { onPress?: () => void } & { ref?: RefObject<HTMLButtonElement> }
  >;
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
  const BasicModalExample: React.FC<
    ModalA11yProps & {
      disablePortal?: boolean;
      visible?: boolean;
      hideDividers?: boolean;
    }
  > = ({
    children,
    disablePortal,
    visible: defaultVisible,
    hideDividers,
    triggerRef,
    focusTrigger,
  }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler(defaultVisible ?? true);

    return (
      <>
        <Button onPress={toggleOn} ref={triggerRef}>
          Open Modal
        </Button>
        <Modal
          visible={visible}
          onRequestClose={toggleOff}
          disablePortal={disablePortal}
          hideDividers={hideDividers}
          onDidClose={focusTrigger}
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

  const PortalModalExample: React.FC<ModalA11yProps> = ({ children, triggerRef, focusTrigger }) => {
    const { openModal, closeModal } = useModal();

    const handlePress = useCallback(
      () =>
        openModal(
          <Modal visible onRequestClose={closeModal} onDidClose={focusTrigger}>
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
      [openModal, closeModal, focusTrigger, children],
    );

    return (
      <Button onPress={handlePress} ref={triggerRef}>
        Open Modal
      </Button>
    );
  };

  const MockModal: React.FC<Partial<ModalBaseProps & ModalHeaderBaseProps> & ModalA11yProps> = ({
    onRequestClose,
    onBackButtonPress,
    title = 'Basic Modal',
    visible: externalVisible,
    testID,
    triggerRef,
    focusTrigger,
    accessibilityLabelledBy,
    accessibilityLabel,
  }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler(externalVisible);

    const handleClose = useCallback(() => {
      onRequestClose?.();
      toggleOff();
    }, [onRequestClose, toggleOff]);

    return (
      <>
        <Button onPress={toggleOn} ref={triggerRef} testID="modal-trigger">
          Open Modal
        </Button>
        <Modal
          testID={testID}
          visible={visible}
          accessibilityLabelledBy={accessibilityLabelledBy}
          accessibilityLabel={accessibilityLabel}
          onRequestClose={handleClose}
          onDidClose={focusTrigger}
          disablePortal
        >
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

  const BasicModal = (props: ModalA11yProps) => (
    <BasicModalExample {...props}>
      <LoremIpsum />
    </BasicModalExample>
  );

  const VisibleModal = (props: ModalA11yProps) => (
    <BasicModalExample {...props} visible>
      <LoremIpsum />
    </BasicModalExample>
  );

  const ModalWithoutPortal = (props: ModalA11yProps) => (
    <BasicModalExample {...props} disablePortal>
      <LoremIpsum />
    </BasicModalExample>
  );

  const LongModal = (props: ModalA11yProps) => (
    <BasicModalExample {...props}>
      <LoremIpsum repeat={30} />
      {!!TextInput && <TextInput label="" placeholder="test input" />}
    </BasicModalExample>
  );

  const PortalModal = (props: ModalA11yProps) => {
    return (
      <PortalModalExample {...props}>
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
