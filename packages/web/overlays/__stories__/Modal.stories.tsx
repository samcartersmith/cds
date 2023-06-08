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
  BackButtonModal: BackButtonModalExample,
  VisibleModal: VisibleModalExample,
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

  return <BasicModalExample triggerRef={triggerRef} focusTrigger={focusTrigger} />;
};

export const BackButtonModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();

  return <BackButtonModalExample triggerRef={triggerRef} focusTrigger={focusTrigger} />;
};

export const VisibleModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();

  return <VisibleModalExample triggerRef={triggerRef} focusTrigger={focusTrigger} />;
};

export const ModalWithoutPortal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();

  return <ModalWithoutPortalExample triggerRef={triggerRef} focusTrigger={focusTrigger} />;
};

export const LongModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();

  return <LongModalExample triggerRef={triggerRef} focusTrigger={focusTrigger} />;
};

export const PortalModal = () => {
  const { triggerRef, focusTrigger } = useTriggerFocus();

  return <PortalModalExample triggerRef={triggerRef} focusTrigger={focusTrigger} />;
};
