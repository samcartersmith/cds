import { CreateModalProps, modalBuilder } from '@cbhq/cds-common/internal/modalBuilder';

import { Button } from '../../buttons/Button';
import { useTriggerFocus } from '../../hooks/useTriggerFocus';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '..';

export default {
  title: 'Core Components/Modal',
  component: Modal,
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
