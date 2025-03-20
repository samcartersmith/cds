import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useModal } from '@cbhq/cds-common2/overlays/useModal';

import { Button } from '../../buttons/Button';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal, type ModalProps } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';
import { ModalHeader } from '../modal/ModalHeader';

export default {
  title: 'Core Components/Modal',
  component: Modal,
};

type ModalA11yProps = {
  triggerRef?: React.RefObject<HTMLButtonElement>;
  focusTrigger?: () => void;
  enableBackButton?: boolean;
  visible?: boolean;
};

const useTriggerFocus = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const focusTrigger = () => {
    triggerRef.current?.focus();
  };

  return {
    triggerRef,
    focusTrigger,
  };
};

const BasicModalExample: React.FC<
  React.PropsWithChildren<Omit<ModalProps, 'onRequestClose' | 'visible'> & ModalA11yProps>
> = ({
  children,
  disablePortal,
  visible: defaultVisible,
  hideDividers,
  triggerRef,
  focusTrigger,
  enableBackButton,
  width,
  maxWidth,
  focusTabIndexElements,
}) => {
  const [visible, setVisible] = useState(defaultVisible ?? true);

  return (
    <>
      <Button ref={triggerRef} onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <Modal
        disablePortal={disablePortal}
        focusTabIndexElements={focusTabIndexElements}
        hideDividers={hideDividers}
        maxWidth={maxWidth}
        onDidClose={focusTrigger}
        onRequestClose={() => setVisible(false)}
        visible={visible}
        width={width}
      >
        <ModalHeader
          backAccessibilityLabel="Back"
          closeAccessibilityLabel="Close"
          onBackButtonClick={enableBackButton ? () => setVisible(false) : undefined}
          testID="Basic Modal Test ID"
          title="Basic Modal"
        />
        <ModalBody tabIndex={0} testID="modal-body">
          {children}
        </ModalBody>
        <ModalFooter
          primaryAction={<Button onClick={() => setVisible(false)}>Save</Button>}
          secondaryAction={
            <Button onClick={() => setVisible(false)} variant="secondary">
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
            primaryAction={<Button onClick={closeModal}>Save</Button>}
            secondaryAction={
              <Button onClick={closeModal} variant="secondary">
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
    <Button ref={triggerRef} onClick={handlePress}>
      Open Modal
    </Button>
  );
};

export const BasicModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();
  return (
    <BasicModalExample focusTrigger={focusTrigger} triggerRef={triggerRef}>
      <LoremIpsum />
    </BasicModalExample>
  );
};

export const CustomWidthModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();
  return (
    <BasicModalExample focusTrigger={focusTrigger} triggerRef={triggerRef} width={300}>
      <LoremIpsum />
    </BasicModalExample>
  );
};

export const BackButtonModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();
  return (
    <BasicModalExample enableBackButton focusTrigger={focusTrigger} triggerRef={triggerRef}>
      <LoremIpsum />
    </BasicModalExample>
  );
};

export const ModalWithoutPortal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();
  return (
    <BasicModalExample disablePortal focusTrigger={focusTrigger} triggerRef={triggerRef}>
      <LoremIpsum />
    </BasicModalExample>
  );
};

export const LongModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();
  return (
    <BasicModalExample focusTabIndexElements focusTrigger={focusTrigger} triggerRef={triggerRef}>
      <LoremIpsum repeat={30} />
    </BasicModalExample>
  );
};

export const PortalModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();
  return (
    <PortalModalExample focusTrigger={focusTrigger} triggerRef={triggerRef}>
      <LoremIpsum />
    </PortalModalExample>
  );
};
