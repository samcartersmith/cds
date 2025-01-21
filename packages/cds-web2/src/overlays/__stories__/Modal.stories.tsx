import React, { useRef } from 'react';
import { CreateModalProps, modalBuilder } from '@cbhq/cds-common2/internal/modalBuilder';

import { Button } from '../../buttons/Button';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal } from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalBody';
import { ModalFooter } from '../Modal/ModalFooter';
import { ModalHeader } from '../Modal/ModalHeader';

export default {
  title: 'Core Components/Modal',
  component: Modal,
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

const {
  BasicModal: BasicModalExample,
  CustomWidthModal: CustomWidthModalExample,
  BackButtonModal: BackButtonModalExample,
  ModalWithoutPortal: ModalWithoutPortalExample,
  LongModal: LongModalExample,
  PortalModal: PortalModalExample,
} = modalBuilder({
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  LoremIpsum,
} as CreateModalProps);

export const BasicModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();

  return <BasicModalExample focusTrigger={focusTrigger} triggerRef={triggerRef} />;
};

export const CustomWidthModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();

  return <CustomWidthModalExample focusTrigger={focusTrigger} triggerRef={triggerRef} />;
};

export const BackButtonModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();

  return <BackButtonModalExample focusTrigger={focusTrigger} triggerRef={triggerRef} />;
};

export const ModalWithoutPortal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();

  return <ModalWithoutPortalExample focusTrigger={focusTrigger} triggerRef={triggerRef} />;
};

export const LongModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();

  return (
    <LongModalExample focusTabIndexElements focusTrigger={focusTrigger} triggerRef={triggerRef} />
  );
};

export const PortalModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();

  return <PortalModalExample focusTrigger={focusTrigger} triggerRef={triggerRef} />;
};
