import React, { ReactElement, RefObject, useCallback, useEffect } from 'react';

import { useToggler } from '../hooks/useToggler';
import { useModal } from '../overlays/useModal';
import type {
  ButtonBaseProps,
  ModalBaseProps,
  ModalHeaderBaseProps,
  NoopFn,
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

type ModalOptions = {
  disablePortal?: boolean; // web only
  visible?: boolean;
  hideDividers?: boolean;
  enableBackButton?: boolean;
};

export type CreateModalProps = {
  Modal: React.ComponentType<
    React.PropsWithChildren<ModalBaseProps & ModalAccessibilityProps & { disablePortal?: boolean }>
  >;
  ModalBody: React.ComponentType<React.PropsWithChildren<unknown>>;
  ModalHeader: React.ComponentType<
    React.PropsWithChildren<ModalHeaderBaseProps & { onBackButtonPress?: NoopFn }>
  >;
  ModalFooter: React.ComponentType<
    React.PropsWithChildren<
      {
        primaryAction: NonNullable<ReactElement<ButtonBaseProps & { onPress?: NoopFn }>> &
          SharedProps;
        secondaryAction?: ReactElement<ButtonBaseProps & { onPress?: NoopFn }>;
      } & SharedProps
    >
  >;
  LoremIpsum: React.ComponentType<React.PropsWithChildren<Record<string, unknown>>>;
  Button: React.ComponentType<
    React.PropsWithChildren<
      ButtonBaseProps & { onPress?: NoopFn } & SharedProps & { ref?: RefObject<HTMLButtonElement> }
    >
  >;
  TextInput?: React.ComponentType<React.PropsWithChildren<TextInputBaseProps>>;
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
  const BasicModalExample: React.FC<React.PropsWithChildren<ModalA11yProps & ModalOptions>> = ({
    children,
    disablePortal, // web only
    visible: defaultVisible,
    hideDividers,
    triggerRef,
    focusTrigger,
    enableBackButton,
  }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler(defaultVisible ?? true);

    return (
      <>
        <Button ref={triggerRef} onPress={toggleOn}>
          Open Modal
        </Button>
        <Modal
          disablePortal={disablePortal}
          hideDividers={hideDividers}
          onDidClose={focusTrigger}
          onRequestClose={toggleOff}
          visible={visible}
        >
          <ModalHeader
            backAccessibilityLabel="Back"
            closeAccessibilityLabel="Close"
            onBackButtonPress={enableBackButton ? toggleOff : undefined}
            title="Basic Modal"
          />
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

  const PortalModalExample: React.FC<React.PropsWithChildren<ModalA11yProps>> = ({
    children,
    triggerRef,
    focusTrigger,
  }) => {
    const { openModal, closeModal } = useModal();

    const handlePress = useCallback(
      () =>
        openModal(
          <Modal visible onDidClose={focusTrigger} onRequestClose={closeModal}>
            <ModalHeader closeAccessibilityLabel="Close" title="Default Modal" />
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

    useEffect(() => {
      handlePress();

      return () => closeModal();
    }, [closeModal, handlePress]);

    return (
      <Button ref={triggerRef} onPress={handlePress}>
        Open Modal
      </Button>
    );
  };

  const MockModal = ({
    onRequestClose,
    onDidClose,
    onBackButtonPress,
    title = 'Basic Modal',
    visible: externalVisible,
    testID,
    triggerRef,
    focusTrigger,
    accessibilityLabelledBy,
    accessibilityLabel,
    backAccessibilityLabel,
    backAccessibilityHint,
    closeAccessibilityLabel,
    closeAccessibilityHint,
  }: Partial<ModalBaseProps & ModalHeaderBaseProps & { onBackButtonPress?: NoopFn }> &
    ModalA11yProps) => {
    const [visible, { toggleOn, toggleOff }] = useToggler(externalVisible);

    const handleClose = useCallback(() => {
      onRequestClose?.();
      toggleOff();
    }, [onRequestClose, toggleOff]);

    const handleDidClose = useCallback(() => {
      onDidClose?.();
      focusTrigger?.();
    }, [onDidClose, focusTrigger]);

    return (
      <>
        <Button ref={triggerRef} onPress={toggleOn} testID="modal-trigger">
          Open Modal
        </Button>
        <Modal
          disablePortal
          accessibilityLabel={accessibilityLabel}
          accessibilityLabelledBy={accessibilityLabelledBy}
          onDidClose={handleDidClose}
          onRequestClose={handleClose}
          testID={testID}
          visible={visible}
        >
          <ModalHeader
            backAccessibilityHint={backAccessibilityHint}
            backAccessibilityLabel={backAccessibilityLabel}
            closeAccessibilityHint={closeAccessibilityHint}
            closeAccessibilityLabel={closeAccessibilityLabel}
            onBackButtonPress={onBackButtonPress}
            title={title}
          />
          <ModalBody>
            <LoremIpsum />
          </ModalBody>
          <ModalFooter
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
            testID="modal-footer"
          />
        </Modal>
      </>
    );
  };

  const BasicModal = (props: ModalA11yProps & ModalOptions) => (
    <BasicModalExample {...props}>
      <LoremIpsum />
    </BasicModalExample>
  );

  const BackButtonModal = (props: ModalA11yProps) => (
    <BasicModalExample {...props} enableBackButton>
      <LoremIpsum />
    </BasicModalExample>
  );

  // web only
  const ModalWithoutPortal = (props: ModalA11yProps) => (
    <BasicModalExample {...props} disablePortal>
      <LoremIpsum />
    </BasicModalExample>
  );

  const LongModal = (props: ModalA11yProps & ModalOptions) => (
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
    BackButtonModal,
    ModalWithoutPortal,
    LongModal,
    PortalModal,
    MockModal,
  };
}
